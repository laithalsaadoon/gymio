from my_types import Workout
from trainer import Trainer
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler

app = FastAPI()
origins = ["*"]
app.add_middleware(CORSMiddleware, allow_origins=origins)

scheduler = BackgroundScheduler()
trainer = Trainer(scheduler)


@app.post("/start")
async def start(workout: Workout):
    trainer.post_schedule(workout)
    return {"succeeded": True}


@app.get("/pause")
async def pause():
    trainer.pause()
    return {"succeeded": True}


@app.get("/resume")
async def resume():
    trainer.resume()
    return {"succeeded": True}


@app.get("/stop")
async def stop():
    trainer.stop()
    return {"succeeded": True}
