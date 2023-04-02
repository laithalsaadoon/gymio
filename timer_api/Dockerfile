FROM python:3.9
WORKDIR /timer_lights_button
COPY . .
ENV PYTHONPATH=${PYTHONPATH}:${PWD}

RUN sudo curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
RUN pip3 install --upgrade pip
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --no-dev