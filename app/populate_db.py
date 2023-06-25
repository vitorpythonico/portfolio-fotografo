import os
from datetime import date
from . import db
from .models import Photo, Album, User, Profile

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
	album = Album(name=name)

	db.session.add(album)
	db.session.commit()

def create_user(user, passwd, recovery_email):
	user = User(
		username=user,
		password=passwd,
		recovery_email=recovery_email
		)
	user._clean_password = passwd

	db.session.add(user)
	db.session.commit()

def create_profile(email, instagram, whatsapp, cdn):
	profile = Profile(
		email=email,
		instagram=instagram,
		whatsapp=whatsapp,
		cdn=cdn
		)

	db.session.add(profile)
	db.session.commit()

def populate():
	add_album('viagem')
	add_album('pessoal')

	add_photo('city.jpeg', 'Estudando pra Havard', 'New York', 2)
	add_photo('antarctica.jpg', 'Jornada pra provar que a Terra é plana', 'Antartica', 1)
	add_photo('desert.jpeg', 'Pequeno saque a tumba do Faraó', 'Saara', 1)
	add_photo('floresta.jpg', 'Caçando índios e dormindo com onças, não pera...', 'Amazonas', 1)
	add_photo('ocean.jpeg', 'Cansei de escrever', 'Planet X', 2)
	add_photo('alps train.jpg', 'Gastando meu 13º', 'Swiss Alps', 1)
	add_photo('earth.jpg', 'Real ou barça?', '??', 2)
	add_photo('header-moorea.jpg', 'Após lutar contra Ragnar Lothbrok', 'Valhalla', 2)
	add_photo('huacachina-from-air-oasis.jpg', 'Vendo miragens após fumar 3 verdinhas e ficar perdido no deserto', 'México', 2)
	add_photo('new-work.jpg', 'New Yoooooooork', 'New Work, USA', 2)

	create_user('admin', 'admin', 'emailderecuperaçao@gmail.com')
	create_profile(
		'brunoalvesguimaraes@gmail.com', 
		'https://www.instagram.com/batalhadaaldeia/',
		'https://chat.whatsapp.com/ELW3pMzZ9L4Gwspkj6nKqW',
		'http://192.168.0.107:5000/imagens/'
	)
