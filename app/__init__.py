from flask import Flask, send_from_directory, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from config import config

db = SQLAlchemy()

def create_app(config_name):
	app = Flask(__name__, static_url_path='', static_folder='frontend/')
	app.config.from_object(config[config_name])
	CORS(app, resources={'/api/*': {'origins': 'http://localhost:*'}})
	db.init_app(app)

	from . import api
	from . import test_db

	with app.app_context():
		db.drop_all()
		db.create_all()
		test_db.run_db_tests()

	api.init_bp(app)

	@app.route('/')
	def index():
		return send_from_directory(app.static_folder, 'index.html')

	return app
