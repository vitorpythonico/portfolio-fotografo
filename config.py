import os
from datetime import timedelta

BASE_FOLDER = os.path.dirname(__file__)

def create_db(app, db):
	path = app.config['SQLALCHEMY_DATABASE_URI'][10:]
	if os.path.exists(path):
		return True

	db.create_all()
	return False

def create_img_folder(folder):
	path = os.path.join(BASE_FOLDER, folder)

	if not (os.path.exists(path)):
		os.mkdir(path, mode=0o644)


class Config:
	DEBUG = False
	TESTING = False
	SECRET_KEY = os.environ.get('SECRET_KEY')
	IMG_PATH = os.environ.get('IMG_PATH')
	JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
	JWT_TOKEN_LOCATION = 'headers'
	JWT_IDENTITY_CLAIM = 'user_id'
	JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
	JWT_REFRESH_TOKEN_EXPIRES = timedelta(hours=1)


class DevelopmentConfig(Config):
	DEBUG = True
	SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URL', 'sqlite:///' + os.path.join(BASE_FOLDER, 'dev-storage.sqlite'))

class TestingConfig(Config):
	TESTING = True
	SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL', 'sqlite://')

class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(BASE_FOLDER, 'storage.sqlite'))

config = {
	'development': DevelopmentConfig,
	'testing': TestingConfig,
	'production': ProductionConfig
}
