from flask import Flask, request, jsonify, make_response
import json
from my_types.my_types import HIIT
from trainer.trainer import Trainer
# from fastapi import FastAPI

from apscheduler.schedulers.background import BackgroundScheduler

app = Flask(__name__)
# app = FastAPI()
scheduler = BackgroundScheduler()
trainer = Trainer(scheduler)


@app.route("/start", methods=["POST"])
def start():
    workout = HIIT(**json.loads(request.data))
    trainer.post_schedule(workout)
    trainer.start()
    return make_response(jsonify({"succeeded": True}), 200)


@app.route("/pause", methods=["GET"])
def pause():
    trainer.pause()
    return make_response(jsonify({"succeeded": True}), 200)


@app.route("/resume", methods=["GET"])
def resume():
    trainer.resume()
    return make_response(jsonify({"succeeded": True}), 200)


@app.route("/stop", methods=["GET"])
def stop():
    trainer.stop()
    return make_response(jsonify({"succeeded": True}), 200)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)

    # while True:
    # try:
    #     string = input(
    #         "p to pause, r to resume, s to stop, ss to start, e to exit\n"
    #     )
    #     if string == "p":
    #         trainer.pause()
    #     elif string == "r":
    #         trainer.resume()
    #     elif string == "s":
    #         trainer.stop()
    #     elif string == "ss":
    #         trainer.start()
    #     elif string == "e":
    #         trainer.stop()
    #         break
    # except (KeyboardInterrupt, SystemExit):
    #     # Not strictly necessary if daemonic mode is enabled but should be done if possible
    #     scheduler.shutdown()
