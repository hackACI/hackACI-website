# hAckCI Website

## Overview

These are the backend systems for hAckCI. We use Python Django and put focus on maintainability.

## Setup

To setup for locally installing the website, follow the instructions below:

1. Make sure you have [Python 3+](https://www.python.org/) installed on your system.
2. Clone the repo: `git clone https://github.com/hackACI/hackACI-website.git`
3. Create a virtual environment for Python3, you can run `python -m venv .venv`, then `source .venv/bin/activate` or `.\venv\scripts\activate.bat`.
4. cd into the hackACI directory and run `pip install -r requirements.txt`.
5. Copy the `.env.example` file into the `.env` file (using `cp` if needed) to modify config, and optionally put your own `SECRET_KEY`.
6. Run the migrations included using `python manage.py migrate`.
7. After the steps above, you can run `python manage.py runserver` to start the server locally.

## Notes

- By default, the server starts with `DEBUG = True` and `SECURE_SSL_REDIRECT = False` unless stated otherwise in the `.env` config file.
- `.env.example` file is provided for running the application, needed for running in `hackACI/settings.py`.
- a random custom key is provided by default with (`get_random_secret_key`) function.
