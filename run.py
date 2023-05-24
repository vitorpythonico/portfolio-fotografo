import os
from dotenv import load_dotenv

from flask_migrate import Migrate
from app import create_app, db
from config import basedir

load_dotenv(os.path.join(basedir, '.env'))
config_name = os.getenv('FLASK_CONFIG', 'development')
app = create_app(config_name)
migrate = Migrate(app, db)
