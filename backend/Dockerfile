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

RUN apt-get install dos2unix
RUN dos2unix --newfile docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN apt-get install netcat curl -y

ENTRYPOINT [ "bash", "/usr/local/bin/docker-entrypoint.sh" ]
