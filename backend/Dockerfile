# Use an official Python runtime as a parent image
FROM python:3.13-slim

# Copy the requirements file and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the port Gunicorn will run on
EXPOSE 8000

# Start Gunicorn to serve your Flask app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]