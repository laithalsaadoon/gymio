"""

"""
import sys
import time
import platform
import asyncio
import logging
from bleak import BleakClient, discover, BleakError

log = logging.getLogger(__name__)
log.setLevel(logging.DEBUG)
h = logging.StreamHandler(sys.stdout)
h.setLevel(logging.DEBUG)
log.addHandler(h)

address = "FD:41:A1:D0:A4:8A"
uuid = "00002a37-0000-1000-8000-00805f9b34fb"

ADDRESS = (
    address if platform.system() != "Darwin" else "B9EA5233-37EF-4DD6-87A8-2A875E821C46"
)
NOTIFICATION_UUID = uuid
if len(sys.argv) == 3:
    ADDRESS = sys.argv[1]
    NOTIFICATION_UUID = sys.argv[2]


def interpret(data):
    """
    data is a list of integers corresponding to readings from the BLE HR monitor
    """

    byte0 = data[0]
    res = {}
    res["hrv_uint8"] = (byte0 & 1) == 0
    sensor_contact = (byte0 >> 1) & 3
    if sensor_contact == 2:
        res["sensor_contact"] = "No contact detected"
    elif sensor_contact == 3:
        res["sensor_contact"] = "Contact detected"
    else:
        res["sensor_contact"] = "Sensor contact not supported"
    res["ee_status"] = ((byte0 >> 3) & 1) == 1
    res["rr_interval"] = ((byte0 >> 4) & 1) == 1

    if res["hrv_uint8"]:
        res["hr"] = data[1]
        i = 2
    else:
        res["hr"] = (data[2] << 8) | data[1]
        i = 3

    if res["ee_status"]:
        res["ee"] = (data[i + 1] << 8) | data[i]
        i += 2

    if res["rr_interval"]:
        res["rr"] = []
        while i < len(data):
            # Note: Need to divide the value by 1024 to get in seconds
            res["rr"].append((data[i + 1] << 8) | data[i])
            i += 2

    return res

async def run():
    devices = await discover()
    for d in devices:
        print(d)


async def print_services(mac_addr: str):
    async with BleakClient(mac_addr) as client:
        svcs = await client.get_services()
        print("Services:")
        for service in svcs:
            print(service)


async def run_ble_client(address: str, queue: asyncio.Queue):
    async def callback_handler(sender, data):
        await queue.put((time.time(), data))

    async with BleakClient(address) as client:
        log.info(f"Connected: {client.is_connected}")
        await client.start_notify(NOTIFICATION_UUID, callback_handler)
        await asyncio.sleep(10.0)
        await client.stop_notify(NOTIFICATION_UUID)
        # Send an "exit command to the consumer"
        await queue.put((time.time(), None))


async def run_queue_consumer(queue: asyncio.Queue):
    while True:
        # Use await asyncio.wait_for(queue.get(), timeout=1.0) if you want a timeout for getting data.
        epoch, data = await queue.get()
        res = interpret(data)
        if data is None:
            log.info(
                "Got message from client about disconnection. Exiting consumer loop..."
            )
            break
        else:
            log.info(
                f"Received callback data via async queue at {epoch}: {res}"
            )


async def main(address: str):
    queue = asyncio.Queue()
    client_task = run_ble_client(address, queue)
    consumer_task = run_queue_consumer(queue)
    await asyncio.gather(client_task, consumer_task)
    log.info("Main method done.")


if __name__ == "__main__":

    loop = asyncio.get_event_loop()
    # loop.run_until_complete(run())
    # loop.run_until_complete(print_services(ADDRESS))

    asyncio.run(main(ADDRESS))

