from . import db

class Photo(db.Model):
	__tablename__ = 'photos'
	id = db.Column(db.Integer, primary_key=True)
	src = db.Column(db.String(200), unique=True, nullable=False)
	title = db.Column(db.String(150))
	location = db.Column(db.String(100))
	date = db.Column(db.DateTime)
	album_id = db.Column(db.Integer, db.ForeignKey('albums.id'))

	def __repr__(self):
		return f'Photo id={self.id} src={self.src} album={self.album_id}'

class Album(db.Model):
	__tablename__ = 'albums'
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(64), unique=True, nullable=False)
	photos = db.relationship('Photo', backref='album')

	def __repr__(self):
		return f'Album id={self.id} name={self.name}'
