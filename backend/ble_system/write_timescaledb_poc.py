import psycopg2
import os

CONNECTION = os.getenv("PSQL_CONNECTION")

conn = psycopg2.connect(CONNECTION)

query_create_sensors_table = """CREATE TABLE sensors (
                                    id SERIAL PRIMARY KEY,
                                    type VARCHAR(50),
                                    location VARCHAR(50)
                                );
                                """

# see definition in Step 1
cursor = conn.cursor()
cursor.execute(query_create_sensors_table)
conn.commit()
cursor.close()

# create sensor data hypertable
query_create_sensordata_table = """CREATE TABLE sensor_data (
                                        time TIMESTAMPTZ NOT NULL,
                                        sensor_id INTEGER,
                                        temperature DOUBLE PRECISION,
                                        cpu DOUBLE PRECISION,
                                        FOREIGN KEY (sensor_id) REFERENCES sensors (id)
                                    );
                                    """

query_create_sensordata_hypertable = "SELECT create_hypertable('sensor_data', 'time');"
cursor = conn.cursor()
cursor.execute(query_create_sensordata_table)
cursor.execute(query_create_sensordata_hypertable)
# commit changes to the database to make changes persistent
conn.commit()
cursor.close()


sensors = [('a', 'floor'), ('a', 'ceiling'), ('b', 'floor'), ('b', 'ceiling')]
cursor = conn.cursor()
for sensor in sensors:
    try:
        cursor.execute("INSERT INTO sensors (type, location) VALUES (%s, %s);",
            (sensor[0], sensor[1]))
    except (Exception, psycopg2.Error) as error:
        print(error.pgerror)
conn.commit()
