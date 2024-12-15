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

EXPOSE 8000

# Copy and configure entrypoint.sh
COPY entrypoint.sh /app/entrypoint.sh

USER root

# Install netcat
RUN apt-get update && apt install netcat-traditional -y

RUN apt-get update && apt-get install -y supervisor

RUN chmod +x /app/entrypoint.sh

# # Use non-root user
# USER myuser

ENTRYPOINT ["/app/entrypoint.sh"]
