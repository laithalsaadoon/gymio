from my_types import Workout
from trainer import Trainer
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from apscheduler.schedulers.background import BackgroundScheduler
from database.models import ButtonRestDuration
from database.database import SessionLocal
from sqlalchemy.orm import Session
from database.database import engine
from database.models import Base
from pydantic import BaseModel, Field
from button.button import Button
Base.metadata.create_all(bind=engine)

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
session = SessionLocal()
Button(lights=trainer.lights)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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

class ButtonRestDurationRequest(BaseModel):
    duration: int = Field(..., ge=30, le=300)

@app.post("/button_duration")
async def button_duration(duration: ButtonRestDurationRequest, db: Session = Depends(get_db)):
    try:
        # Create a ButtonRestDuration instance with id=1 and the new duration
        button_rest_duration = ButtonRestDuration(id=1, duration=duration.duration)
        
        # Use merge to update if exists, or insert if not
        db.merge(button_rest_duration)
        db.commit()
        
        return {"succeeded": True}
    except Exception as e:
        db.rollback()
        return {"succeeded": False, "error": str(e)}

@app.get("/button_duration")
async def get_button_duration():
    button_rest_duration = session.query(ButtonRestDuration).filter(ButtonRestDuration.id == 1).first()
    return {"duration": button_rest_duration.duration}
