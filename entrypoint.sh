#!/bin/bash

# wait for database
if [ "$DATABASE" = "postgres" ]; then
    echo "Waiting for PostgreSQL..."
    retries=20
    until nc -z $DB_HOST $DB_PORT || [ $retries -eq 0 ]; do
      echo "Retrying in 0.5 seconds..."
      sleep 0.5
      retries=$((retries-1))
    done

    if [ $retries -eq 0 ]; then
        echo "PostgreSQL connection failed"
        exit 1
    fi
    echo "PostgreSQL started"
fi


# Run database migrations
echo "Running database migrations..."
python manage.py migrate django_celery_results
python manage.py migrate django_celery_beat
python manage.py migrate --noinput

# Collect static files
echo "Collecting static files..."
python manage.py collectstatic --noinput

# # start celery
# echo "Starting celert"
# exec  celery -A auto_app.celery:app worker --loglevel=info

# # Start Gunicorn
# echo "Starting Gunicorn..."
# exec gunicorn autoblue_django.wsgi:application --bind 0.0.0.0:8000 --workers=3 --threads=4

# Start Supervisor
exec supervisord -c ./supervisord.conf