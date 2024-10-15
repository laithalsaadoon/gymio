from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Computed
from sqlalchemy.dialects.postgresql import TIMESTAMP, DATE
from sqlalchemy.orm import relationship
from .database import Base

class ButtonRestDuration(Base):
    __tablename__ = "button_rest_duration"

    id = Column(Integer, primary_key=True, index=True)
    duration = Column(Integer)

class Device(Base):
    __tablename__ = "devices"

    id = Column(Integer, primary_key=True, index=True)
    owner_id = Column(Integer, ForeignKey("users.id"), index=True)
    is_connected = Column(Boolean)
    last_seen = Column(TIMESTAMP(timezone=True), nullable=True)
    hr_address = Column(String, unique=True)
    battery_level = Column(Integer)
    owner = relationship("User", back_populates="device")


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    device = relationship("Device", back_populates="owner")
    birthday = Column(DATE)
    # target_hr = Column(
    #     Integer, Computed("220-date_part('year', age(date birthday))::int")
    # )


class Exercise(Base):
    __tablename__ = "exercises"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)


class WeightsSession(Base):
    __tablename__ = "weights_sessions"

    id = Column(Integer, primary_key=True, index=True)
    exercise_id = Column(Integer, ForeignKey("exercises.id"), index=True)
    weight = Column(Integer)
    set = Column(Integer)
    reps = Column(Integer)


class Session(Base):
    __tablename__ = "sessions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True)

    use_hr_band = Column(Boolean, default=False)
    hr_points = Column(Integer, nullable=True)
    start = Column(TIMESTAMP(timezone=True))
    end = Column(TIMESTAMP(timezone=True))
    # duration = Column(Integer, Computed("extract(MINUTE from end-start)::int"))
    nine_round_workout_id = Column(
        Integer, ForeignKey("nine_round_workouts.id"), nullable=True
    )
    workout_type_id = Column(Integer, ForeignKey("workout_types.id"))
    status_id = Column(Integer, ForeignKey("status.id"))


class Status(Base):
    __tablename__ = "status"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    description = Column(String)


class SensorData(Base):
    __tablename__ = "sensor_data"

    timestamp = Column(TIMESTAMP(timezone=True), primary_key=True)

    session_id = Column(Integer, ForeignKey("sessions.id"), index=True)
    bpm = Column(Integer)
    rr_interval_in_ms = Column(Integer)


class NineRoundWorkout(Base):
    __tablename__ = "nine_round_workouts"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(DATE)
    # rounds 1 to 9 train and rest
    round_1_train = Column(String)
    round_1_rest = Column(String)
    round_2_train = Column(String)
    round_2_rest = Column(String)
    round_3_train = Column(String)
    round_3_rest = Column(String)
    round_4_train = Column(String)
    round_4_rest = Column(String)
    round_5_train = Column(String)
    round_5_rest = Column(String)
    round_6_train = Column(String)
    round_6_rest = Column(String)
    round_7_train = Column(String)
    round_7_rest = Column(String)
    round_8_train = Column(String)
    round_8_rest = Column(String)
    round_9_train = Column(String)
    round_9_rest = Column(String)


class WorkoutType(Base):
    __tablename__ = "workout_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    description = Column(String)
