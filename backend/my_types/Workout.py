from pydantic import BaseModel, conint


class Workout(BaseModel):
    rounds: conint(ge=2, le=15)
    rest: conint(ge=30, le=120)
    train: conint(ge=60, le=240)
