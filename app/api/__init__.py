import os
from flask import Blueprint

api = Blueprint('api', __name__, static_folder='../../imagens')

from . import account, profile, albums, photos

def init_bp(app):
	app.register_blueprint(api)
