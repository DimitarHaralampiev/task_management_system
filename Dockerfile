# Start with the latest Ubuntu image
FROM ubuntu:latest

# Label with author information
LABEL authors="dimitar"

# Set environment variables
ENV PYTHONUNBUFFERED=1
ENV DEBIAN_FRONTEND=noninteractive

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Debugging: Show Python and pip version
RUN python3 --version
RUN pip3 --version

# Debugging: Show contents of requirements.txt
RUN cat requirements.txt

# Install Python dependencies
RUN pip3 install --no-cache-dir -r requirements.txt

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Command to run FastAPI app with Uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]