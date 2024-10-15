from pydantic import BaseModel, Field


class Workout(BaseModel):
    rounds: int = Field(..., ge=2, le=15)
    rest: int = Field(..., ge=30, le=120)
    train: int = Field(..., ge=60, le=240)
