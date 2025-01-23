# Base image for Python
FROM python:3.9-slim

# Set working directory
WORKDIR /app

# Copy the requirements file and install dependencies
COPY app/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY app/ .

# Expose FastAPI port
EXPOSE 8000

# Run the FastAPI server
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
