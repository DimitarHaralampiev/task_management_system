# Start with the latest Ubuntu image
FROM ubuntu:latest

# Label with author information
LABEL authors="dimitar"

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Install build dependencies
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libpq-dev

# Set environment variables
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app1
COPY . /app

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run Alembic migrations and start the FastAPI app1
CMD alembic upgrade head && uvicorn app.main:app --host 0.0.0.0 --port 8000