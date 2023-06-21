import os
from flask import Flask, send_from_directory, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import config, create_img_folder, create_db


db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_name):
	app = Flask(__name__, static_url_path='', static_folder='frontend/')
	app.config.from_object(config[config_name])

	db.init_app(app)
	jwt.init_app(app)
	CORS(app)

	from . import test_db

	from . import api
	api.init_bp(app)

	if not app.config['IMG_PATH'][:4] == 'http':
		create_img_folder(app.config['IMG_PATH'])

	with app.app_context():
		db_exists = create_db(app, db)
		if not db_exists:
			test_db.run_db_tests()

	@app.route('/')
	def index():
		return send_from_directory(app.static_folder, 'index.html')

	return app
