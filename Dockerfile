# Use the official Python image
FROM python:3.12-slim

# Set build-time variables
ARG DJANGO_SETTINGS_MODULE
ARG SECRET_KEY
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
ARG DB_HOST
ARG DB_PORT
ARG ENCRYPTION_KEY
ARG REDIS_HOST

# Set environment variables for runtime
ENV DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE \
    SECRET_KEY=$SECRET_KEY \
    DB_NAME=$DB_NAME \
    DB_USER=$DB_USER \
    DB_PASSWORD=$DB_PASSWORD \
    DB_HOST=$DB_HOST \
    DB_PORT=$DB_PORT \
    ENCRYPTION_KEY=$ENCRYPTION_KEY \
    REDIS_HOST=$REDIS_HOST

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Expose the port
EXPOSE 8000

# Command to run the project
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "autoblue_django.wsgi:application"]
