#!/usr/bin/env bash
# Create a virtual environment named "venv"
python3 -m venv .venv

# Activate the virtual environment
source .venv/bin/activate

# Install all dependencies from requirements.txt
pip install --upgrade pip
pip install -r requirements.txt