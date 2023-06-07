import os
basedir = os.path.dirname(__file__)

def create_db(app, db):
	path = app.config['SQLALCHEMY_DATABASE_URI'][10:]
	if os.path.exists(path):
		return True

	db.create_all()
	return False

def create_img_folder(folder):
	path = os.path.join(basedir, folder)
	if not (os.path.exists(path)):
		os.mkdir(path, mode=0o644)


class Config:
	DEBUG = False
	TESTING = False
	IMG_PATH = os.getenv('IMG_PATH', os.path.join(basedir, 'images/'))


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
