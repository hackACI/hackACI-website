# hAckCI Website
## This is the repository for hAckCI's offical website. 
### Overview
These are the backend systems for hAckCI. We use Python Django and put focus on maintainability.

---

# Setup
To setup for locally installing the website, follow the instructions below:

1. Make sure you have [Python 3+](https://www.python.org/) installed on your system.
2. git clone the repository (if you don't have git installed, install it too)
2.5 (optional) Create a virtual environment for Python3, you can run ```python -m venv .venv```.
3. cd into the hackACI directory and run ```pip install -r requirements.txt```.
4. Copy the .env.example file into the .env file (using ```cp``` if needed) to modify config, and put your own ```SECRET_KEY```.
5. Run the migrations included using ```python manage.py migrate```.
6. After the steps above, you can run ```python manage.py runserver``` to start the server locally.

## Notes
- By default, the server starts with DEBUG = True and SECURE_SSL_REDIRECT = False unless stated otherwise in the .env config file.
- default .env file is provided for running the application, needed for the changes in settings.py.
- a random custom key is provided by default with (get_random_secret_key) function.


