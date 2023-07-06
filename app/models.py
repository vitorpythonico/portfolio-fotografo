from flask import jsonify
from werkzeug.security import check_password_hash, generate_password_hash
from . import db

class Photo(db.Model):
	__tablename__ = 'photos'
	id = db.Column(db.Integer, primary_key=True)
	src = db.Column(db.String(300), nullable=False)
	description = db.Column(db.String(200))
	place = db.Column(db.String(100))
	date = db.Column(db.DateTime)
	album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))

	@staticmethod
	def get_by_recent_date():
		photos = Photo.query.order_by(Photo.date.desc()).all()
		return Photo.to_json(photos)

	@staticmethod
	def get_by_album(album):
		album_id = Album.query.filter_by(name=album).first_or_404().id
		photos = Photo.query.filter_by(album_id=album_id).all()
		return Photo.to_json(photos)

	@staticmethod
	def to_json(photos):
		photos_dict = {}

		for photo in photos:
			photos_dict[photo.id] = {
				'src': photo.src,
				'description': photo.description,
				'date': photo.format_date(),
				'place': photo.place
			}

		photos_json = jsonify(photos_dict)
		return photos_json

	def format_date(self):
		number_to_abbrev = {
			1: 'jan',
			2: 'fev',
			3: 'mar',
			4: 'abr',
			5: 'mai',
			6: 'jun',
			7: 'jul',
			8: 'ago',
			9: 'set',
			10: 'out',
			11: 'nov',
			12: 'dez',
		}

		return {
			'day': self.date.day,
			'month': number_to_abbrev[self.date.month],
			'year': self.date.year
			}

	def __repr__(self):
		return f'<Photo id={self.id} src={self.src} date={self.date}>'


class Album(db.Model):
	__tablename__ = 'albums'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(64), unique=True, nullable=False)
	photos = db.relationship('Photo', backref='album')

	def __init__(self, name):
		self.name = name

	@staticmethod
	def get_albums():
		albums = Album.query.all()
		response = {}
		for album in albums:
			response[album.id] = {
				'name': album.name
			}

		return response

	@staticmethod
	def exits(album):
		return Album.query.filter_by(name=album).first()

	def __repr__(self):
		return f'<Album id={self.id} name={self.name}>'


class User(db.Model):
	__tablename__ = 'users'
	id = db.Column(db.Integer, primary_key=True)
	username = db.Column(db.String(64), unique=True)
	password = db.Column(db.String(64))
	_clean_password = db.Column(db.String(64))
	recovery_email = db.Column(db.String(100))

	def __init__(self, username, password, recovery_email):
		self.username = username
		self.password = generate_password_hash(password)
		self.recovery_email = recovery_email

	def verify_password(self, passwd):
		return check_password_hash(self.password, passwd)

	def __repr__(self):
		return f'<User user={self.username}>'


class Profile(db.Model):
	__tablename__ = 'profile'
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(100), nullable=False, unique=True)
	instagram = db.Column(db.String(100))
	whatsapp = db.Column(db.String(100))
	cdn = db.Column(db.String(300))

	def __repr__(self):
		return f'<Profile email={self.email}>'

class TokenBlockList(db.Model):
	__tablename__ = 'tokens'
	id = db.Column(db.Integer, primary_key=True)
	jti = db.Column(db.String(36), nullable=False, unique=True)
	token_type = db.Column(db.String(10))
	revoked_at = db.Column(db.DateTime)
	expires = db.Column(db.DateTime)
	user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

	def __repr__(self):
		return f'<TokenBlockList jti={self.jti}> type={self.token_type}'
