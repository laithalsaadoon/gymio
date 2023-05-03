from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Computed
from sqlalchemy.dialects.postgresql import TIMESTAMP, DATE
from sqlalchemy.orm import relationship
from .database import Base


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
    target_hr = Column(
        Integer, Computed("220-date_part('year', age(timestamp birthday))::int")
    )


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
    duration = Column(Integer, Computed("extract(MINUTE from end-start)::int"))
