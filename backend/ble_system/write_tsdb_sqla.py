# write an app to write data to TimescaleDB using SQLAlchemy
from sqlalchemy import create_engine
from sqlalchemy import ForeignKey, Double
from sqlalchemy.orm import Session
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy.dialects.postgresql import TIMESTAMP, DOUBLE_PRECISION
from datetime import datetime, timezone
from time import sleep
from random import randint

class Base(DeclarativeBase):
    pass

class SensorData(Base):
    __tablename__ = "sensor_data"
    time: Mapped[TIMESTAMP] = mapped_column(TIMESTAMP(timezone=True), primary_key=True)
    sensor_id: Mapped[int] = mapped_column(ForeignKey("sensors.id"))
    temperature: Mapped[float]
    cpu: Mapped[float]
    
    
    def __repr__(self) -> str:
        return f"User(id={self.sensor_id!r}, time={self.time!r}, temp={self.temperature!r})"

class Sensor(Base):
    __tablename__ = "sensors"
    id: Mapped[int] = mapped_column(primary_key=True)
    type: Mapped[str]
    location: Mapped[str]
    
    def __repr__(self) -> str:
        return f"Sensor(id={self.id!r}, type={self.type!r}, location={self.location!r})"

CONNECTION = "postgresql+psycopg2://postgres:password@127.0.0.1:5432/testpoc"

conn = create_engine(CONNECTION)

with Session(conn) as session:
    # for 1 through 5
    for i in range(1, 11, 1):
        sleep(1)
        time_data = SensorData(
            time = datetime.now(timezone.utc),
            sensor_id = 1,
            temperature = randint(0, 100),
            cpu = 1.0
        )
        session.add_all([time_data])
        session.commit()