import os
from flask import Blueprint

IMG_FOLDER = os.getenv('IMG_PATH')

api = Blueprint('api', __name__, static_folder=f'../../{IMG_FOLDER}')

from . import account, profile, albums

def init_bp(app):
	app.register_blueprint(api)
