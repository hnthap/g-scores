FROM python:3.10-slim-buster

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install gcc default-libmysqlclient-dev -y

RUN pip install -U pip setuptools wheel
RUN pip install -U pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt --no-cache-dir

COPY . .

RUN chmod +x docker-entrypoint.sh

RUN apt-get install netcat curl -y

ENTRYPOINT [ "bash", "/usr/src/app/docker-entrypoint.sh" ]
