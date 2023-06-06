import json
from . import db

class Photo(db.Model):
	__tablename__ = 'photos'
	id = db.Column(db.Integer, primary_key=True)
	src = db.Column(db.String(200), unique=True, nullable=False)
	description = db.Column(db.String(150))
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

		photos_json = json.dumps(photos_dict)
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

		return (self.date.day, number_to_abbrev[self.date.month], self.date.year)

	def __repr__(self):
		return f'Photo id={self.id} src={self.src} album={self.album.name} date={self.date}'


class Album(db.Model):
	__tablename__ = 'albums'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(64), unique=True, nullable=False)
	photos = db.relationship('Photo', backref='album')

	def __repr__(self):
		return f'Album id={self.id} name={self.name}'
