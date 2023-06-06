import os
from datetime import date
from . import db
from .models import Photo, Album

def add_photo(path, description, place, album):
	photo = Photo(
		src=path,
		description=description,
		place=place,
		date=date.today(),
		album_id=album
		)

	db.session.add(photo)
	db.session.commit()

def add_album(name):
	album = Album(
		name=name)

	db.session.add(album)
	db.session.commit()

def load_photos(album_id):
	album = Album.query.filter_by(id=album_id).first()
	for photo in album.photos:
		print(photo)

def run_db_tests():
	add_album('travel')
	add_album('hobby')

	add_photo('city.jpeg', 'Studying for Harvard', 'New York', 2)
	add_photo('antarctica.jpg', 'Journey to prove the earth is flat', 'Antartica', 1)
	add_photo('desert.jpeg', 'Robbing the Pharaoh\'s Tomb', 'Saara', 1)
	add_photo('floresta.jpg', 'Hunting indians and sleeping with jaguars, wait...', 'Amazonas', 1)
	add_photo('ocean.jpeg', 'I got lazy', 'Planet X', 2)

	# load_photos(1)
	# load_photos(2)

