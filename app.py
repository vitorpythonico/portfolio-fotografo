import os
from dotenv import load_dotenv

from app import create_app
from config import config, basedir

load_dotenv(os.path.join(basedir, '.env'))
config_name = os.getenv('FLASK_CONFIG', 'development')
app = create_app(config[config_name])
