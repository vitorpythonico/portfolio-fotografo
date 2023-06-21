import os
from dotenv import load_dotenv
from flask_migrate import Migrate

from app import create_app, db
from app.models import User, Photo, Album, TokenBlockList
from config import BASE_FOLDER

load_dotenv(os.path.join(BASE_FOLDER, '.env'))
config_name = os.getenv('FLASK_CONFIG', 'development')
app = create_app(config_name)
migrate = Migrate(app, db)


@app.shell_context_processor
def make_shell_context():
	return dict(
			app=app,
			db=db,
			User=User,
			Photo=Photo,
			Album=Album,
			TokenBlockList=TokenBlockList
		)
