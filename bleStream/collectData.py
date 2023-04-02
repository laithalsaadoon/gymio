"""
Async callbacks with a queue and external consumer
--------------------------------------------------
An example showing how async notification callbacks can be used to
send data received through notifications to some external consumer of
that data.
Created on 2021-02-25 by hbldh <henrik.blidh@nedomkull.com>
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
        if data is None:
            log.info(
                "Got message from client about disconnection. Exiting consumer loop..."
            )
            break
        else:
            log.info(
                f"Received callback data via async queue at {epoch}: {[str(x) for x in data]}"
            )


async def main(address: str):
    queue = asyncio.Queue()
    client_task = run_ble_client(address, queue)
    consumer_task = run_queue_consumer(queue)
    await asyncio.gather(client_task, consumer_task)
    log.info("Main method done.")


if __name__ == "__main__":

    loop = asyncio.get_event_loop()
    loop.run_until_complete(run())
    loop.run_until_complete(print_services(ADDRESS))

    asyncio.run(main(ADDRESS))

