from flask import Flask, send_from_directory

def create_app(config_name):
	app = Flask(__name__, static_url_path='', static_folder='frontend/')
	app.config.from_object(config_name)

	@app.route('/')
	def index():
		return send_from_directory(app.static_folder, 'index.html')

	return app
