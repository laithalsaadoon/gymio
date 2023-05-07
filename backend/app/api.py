from my_types import Workout
from trainer import Trainer
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler

app = FastAPI(
    ssl_certfile="/etc/letsencrypt/live/gymio.me/fullchain.pem",
    ssl_keyfile="/etc/letsencrypt/live/gymio.me/privkey.pem",
)
origins = [
    "http://localhost",
    "http://192.168.248.65:5173",
    "http://gymio.lan:5173",
    "http://gymio.me",
    "https://gymio.me",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
