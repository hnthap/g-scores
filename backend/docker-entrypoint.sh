#!/bin/bash

if [ "$DATABASE" = "mysql" ]; then
    echo "waiting for mysql..."
    while ! nc -Z $SQL_HOST $SQL_PORT; do
        sleep 0.2
    done
    echo "mysql is available"
fi

echo "applying database migrations..."
python manage.py makemigrations
python manage.py migrate

exec "$@"
