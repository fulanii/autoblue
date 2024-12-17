FROM python:3.12-slim

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Create a non-root user
RUN useradd -m myuser

# Set work directory
WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

EXPOSE 8000

# Copy and configure entrypoint.sh
COPY entrypoint.sh /app/entrypoint.sh

USER root

# Install netcat
RUN apt-get update && apt install netcat-traditional -y

RUN apt-get update && apt-get install -y supervisor

RUN chmod +x /app/entrypoint.sh

RUN touch /app/supervisord.log /app/supervisord.pid \
    && chown -R myuser:myuser /app

# Install  NGINX
RUN apt-get update && apt-get install -y nginx && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy your custom nginx.conf file into the image
COPY nginx.conf /etc/nginx/nginx.conf

# Ensure correct permissions
RUN chmod 644 /etc/nginx/nginx.conf
RUN chmod -R 755 /staticfiles

# Switch to non-root user
USER myuser

ENTRYPOINT ["/app/entrypoint.sh"]
