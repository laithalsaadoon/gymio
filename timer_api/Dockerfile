FROM python:3.9
WORKDIR /timer_lights_button
COPY . .
ENV PYTHONPATH=${PYTHONPATH}:${PWD}

ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
RUN pip3 install --upgrade pip
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev

CMD ["python3", "timer_api.py"]