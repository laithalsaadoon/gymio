FROM python:3.9-slim AS python-base
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup" \
    VENV_PATH="/opt/pysetup/.venv"

ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"

# builder-base is used to build dependencies
FROM python-base as builder-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
        curl \
        build-essential

RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python


WORKDIR /timer_api
COPY poetry.lock pyproject.toml /timer_api/
ENV PYTHONPATH=${PYTHONPATH}:${PWD}

# ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
RUN apk add --update \
  build-base \
  cairo \
  cairo-dev \
  cargo \
  freetype-dev \
  gcc \
  gdk-pixbuf-dev \
  gettext \
  lcms2-dev \
  libffi-dev \
  musl-dev \
  openssl-dev \
  pango-dev \
  poppler-utils \
  py-cffi \
  python3-dev \
  rust \
  tcl-dev \
  tk-dev \
  zlib-dev

RUN pip install --upgrade pip
RUN pip install cryptography
RUN pip3 install poetry
RUN poetry config virtualenvs.create false
RUN poetry install --only main --no-root

ENTRYPOINT ["python3"]
CMD ["main.py"]
