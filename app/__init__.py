import os
from flask import Flask, send_from_directory, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import config, create_db


db = SQLAlchemy()
jwt = JWTManager()

def create_app(config_name):
	app = Flask(__name__)
	app.config.from_object(config[config_name])

	db.init_app(app)
	jwt.init_app(app)
	CORS(app)

	from . import populate_db
	from . import api

	api.init_bp(app)

	with app.app_context():

		db_exists = create_db(app, db)
		if not db_exists:
			populate_db.populate()

	return app
