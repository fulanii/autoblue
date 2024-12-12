# Use the official Python image
FROM python:3.12-slim

# Create a non-root user
RUN useradd -m myuser

# Set work directory
WORKDIR /app

# Set build-time variables
ARG DJANGO_SETTINGS_MODULE
ARG SECRET_KEY
ARG DB_NAME
ARG DB_USER
ARG DB_PASSWORD
# ARG DB_HOST
ARG DB_PORT
ARG ENCRYPTION_KEY
ARG REDIS_HOST

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

# Change ownership of the files to myuser
RUN chown -R myuser:myuser /app

# Set environment variables for runtime
ENV DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE \
    SECRET_KEY=$SECRET_KEY \
    DB_NAME=$DB_NAME \
    DB_USER=$DB_USER \
    DB_PASSWORD=$DB_PASSWORD \
    DB_HOST="db" \
    DB_PORT=$DB_PORT \
    ENCRYPTION_KEY=$ENCRYPTION_KEY \
    REDIS_HOST=$REDIS_HOST

# Set the user to the non-root user
USER myuser

# Expose the port
EXPOSE 8000

# Command to run the project
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "autoblue_django.wsgi:application"]
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
