import os
from datetime import timedelta

BASE_FOLDER = os.path.dirname(__file__)

def create_db(app, db):
	path = app.config['SQLALCHEMY_DATABASE_URI'][10:]
	if os.path.exists(path):
		return True

	db.create_all()
	return False

class Config:
	DEBUG = False
	TESTING = False
	SECRET_KEY = os.environ.get('SECRET_KEY')

	JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
	JWT_TOKEN_LOCATION = 'headers'
	JWT_IDENTITY_CLAIM = 'user_id'
	JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
	JWT_REFRESH_TOKEN_EXPIRES = timedelta(weeks=1)


class DevelopmentConfig(Config):
	DEBUG = True
	SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URL', 'sqlite:///' + os.path.join(BASE_FOLDER, 'dev-storage.sqlite'))

	MAIL_SERVER = 'smtp.gmail.com'
	MAIl_PORT = 587
	MAIL_USERNAME = os.environ.get('DEV_MAIL_USERNAME')
	MAIL_PASSWORD = os.environ.get('DEV_MAIL_PASSWORD')
	MAIL_DEFAULT_SENDER = os.environ.get('DEV_MAIL_DEFAULT_SENDER')
	MAIL_USE_TLS = True
	MAIL_USE_SSL = False
	MAIL_DEBUG = False


class TestingConfig(Config):
	TESTING = True
	SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL', 'sqlite://')

	# Change it
	MAIL_SERVER = 'test.server.com'
	MAIl_PORT = 1234
	MAIL_USERNAME = os.environ.get('TEST_MAIL_USERNAME')
	MAIL_PASSWORD = os.environ.get('TEST_MAIL_PASSWORD')
	MAIL_DEFAULT_SENDER = os.environ.get('TEST_MAIL_DEFAULT_SENDER')
	MAIL_USE_TLS = True
	MAIL_USE_SSL = False
	MAIL_DEBUG = True

class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(BASE_FOLDER, 'storage.sqlite'))

	# Change it
	MAIL_SERVER = 'production.server.com'
	MAIl_PORT = 1234
	MAIL_USERNAME = os.environ.get('MAIL_USERNAME')
	MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')
	MAIL_DEFAULT_SENDER = os.environ.get('MAIL_DEFAULT_SENDER')
	MAIL_USE_TLS = True
	MAIL_USE_SSL = False
	MAIL_DEBUG = False


config = {
	'development': DevelopmentConfig,
	'testing': TestingConfig,
	'production': ProductionConfig
}
