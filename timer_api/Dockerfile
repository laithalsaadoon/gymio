FROM python:3.9-alpine
WORKDIR /timer_api
COPY . .
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

CMD ["python3, "main.py"]
