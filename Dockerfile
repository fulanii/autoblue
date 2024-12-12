# Use the official Python image
FROM python:3.12-slim

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1

# Create a non-root user
RUN useradd -m myuser

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

ARG DJANGO_SETTINGS_MODULE
ARG SECRET_KEY
ARG DATABASE
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
    DATABASE=$DATABASE \
    DB_NAME=$DB_NAME \
    DB_USER=$DB_USER \
    DB_PASSWORD=$DB_PASSWORD \
    DB_HOST=$DB_HOST \
    DB_PORT=$DB_PORT \
    ENCRYPTION_KEY=$ENCRYPTION_KEY \
    REDIS_HOST=$REDIS_HOST 

# Expose the port
EXPOSE 8000

# Copy and configure entrypoint.sh
COPY entrypoint.sh /app/entrypoint.sh

# set user to root temporarily
USER root

# istall netcat
RUN apt-get update && apt install netcat-traditional

RUN chmod +x /app/entrypoint.sh

# Set user back to non-root user
USER myuser


# Use entrypoint to run the app
ENTRYPOINT ["/app/entrypoint.sh"]

