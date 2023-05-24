import os
basedir = os.path.dirname(__file__)

class Config:
	DEBUG = False
	TESTING = False
	IMG_PATH = os.getenv('IMG_PATH', 'images/')


class DevelopmentConfig(Config):
	DEBUG = True
	SQLALCHEMY_DATABASE_URI = os.getenv('DEV_DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'dev-storage.sqlite'))

class TestingConfig(Config):
	TESTING = True
	SQLALCHEMY_DATABASE_URI = os.getenv('TEST_DATABASE_URL', 'sqlite://')

class ProductionConfig(Config):
	SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'sqlite:///' + os.path.join(basedir, 'storage.sqlite'))

config = {
	'development': DevelopmentConfig,
	'testing': TestingConfig,
	'production': ProductionConfig
}
