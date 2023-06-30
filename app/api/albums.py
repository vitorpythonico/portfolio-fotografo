from flask import jsonify, request
from flask_jwt_extended import jwt_required

from . import api
from .. import db
from ..models import Photo, Album

@api.route('/albums', methods=['GET'])
def get_albums():
	albums = Album.get_albums()
	return jsonify(albums)

@api.route('/albums/<album>', methods=['GET'])
def get_album(album):
	if album == 'recentes':
		photos = Photo.get_by_recent_date() 
		return photos

	photos = Photo.get_by_album(album=album)
	return photos

@api.route('/albums/<album>', methods=['POST'])
@jwt_required()
def post_album(album):
	try:
		if not Album.exits(album):
			new_album = Album(album)
			db.session.add(new_album)
			db.session.commit()
			return jsonify({'msg': 'Álbum criado com sucesso'}), 200

		return jsonify({'error': 'O álbum já existe'}), 409

	except:
		return jsonify({'error': 'Não foi possível criar o álbum'}), 500

@api.route('/albums/<album>', methods=['PUT'])
@jwt_required()
def put_album(album):
	try: 
		new_name = request.json['new_name']
		album = Album.query.filter_by(name=album).first()

		if album:
			album.name = new_name
			db.session.commit()
			return jsonify({'msg': 'Álbum renomeado com sucesso'}), 200

		return jsonify({'error': 'O álbum não existe'}), 404

	except:
		return jsonify({'error': 'Não foi possível renomear o álbum'}), 500

@api.route('/albums/<album>', methods=['DELETE'])
@jwt_required()
def delete_album(album):
	try:
		album = Album.query.filter_by(name=album).first()

		if album:
			db.session.delete(album)
			db.session.commit()
			return jsonify({'msg': 'Álbum deletado'}), 200

		return jsonify({'error': 'O álbum não existe'}), 404

	except:
		return jsonify({'error': 'Não foi possível deletar o álbum'}), 500
