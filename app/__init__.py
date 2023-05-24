from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy

from config import config

db = SQLAlchemy()

def create_app(config_name):
	app = Flask(__name__, static_url_path='', static_folder='frontend/')
	app.config.from_object(config[config_name])

	db.init_app(app)

	from .test_db import run_db_tests

	with app.app_context():
		db.drop_all()
		db.create_all()
		run_db_tests()

	@app.route('/')
	def index():
		return send_from_directory(app.static_folder, 'index.html')

	return app
