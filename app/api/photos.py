import os
from datetime import date
from flask import jsonify, request, current_app as app
from flask_jwt_extended import jwt_required
from werkzeug.utils import secure_filename

from . import api
from .utils import is_allowed_file
from .. import db
from ..models import Photo

@api.route('/photos/upload', methods=['POST'])
@jwt_required()
def post_photo():
	if 'file' in request.files:
		file = request.files['file']
		if is_allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

			new_photo = Photo(src=filename)
			db.session.add(new_photo)
			db.session.commit() 

			return jsonify({'msg': 'Foto enviada com sucesso'}), 200

		return jsonify({'error': 'Tipo de arquivo inválido'}), 403

	return jsonify({'error': 'Nenhum arquivo foi selecionado'}), 400

@api.route('/photos/upload/metadata', methods=['POST'])
@jwt_required()
def post_photo_metadata():
	filename = request.json['filename']
	description = request.json['description']
	place = request.json['place']
	album_id = request.json['album_id']
	try:
		photo = Photo.query.filter_by(src=filename).first()
		photo.description = description
		photo.place = place
		photo.date = date.today()
		photo.album_id = album_id
		db.session.commit()

		return jsonify({'msg': 'Dados salvos'}), 200

	except:
		return jsonify({'error': 'Erro ao salvar os dados'}), 500

@api.route('/photos/<id>', methods=['DELETE'])
@jwt_required()
def delete_photo(id):
	try:
		photo = Photo.query.filter_by(id=id).first()

		if photo:
			db.session.delete(photo)
			db.session.commit()
			return jsonify({'msg': 'Foto deletada'}), 200

		return jsonify({'error': 'A foto não existe'}), 404

	except:
		return jsonify({'error': 'Não foi possível deletar a foto'}), 500

@api.route('/photos/<id>/album', methods=['PUT'])
@jwt_required()
def change_album(id):
	try:
		album_id = request.json['album_id']
		photo = Photo.query.filter_by(id=id).first()

		if photo:
			photo.album_id = int(album_id)
			db.session.commit()
			return jsonify({'msg': 'Álbum modificado'}), 200

		return jsonify({'error': 'A foto não existe'}), 404

	except:
		return jsonify({'error': 'Não foi possível mudar o álbum'}), 500

@api.route('/photos/<id>/place', methods=['PUT'])
@jwt_required()
def put_src_photo(id):
	try:
		new_place = request.json['place']
		photo = Photo.query.filter_by(id=id).first()

		if photo:
			photo.place = new_place
			db.session.commit()
			return jsonify({'msg': 'Origem atualizada'}), 200

		return jsonify({'error': 'A foto não existe'}), 404

	except:
		return jsonify({'error': 'Não foi possível atualizar a origem'}), 500

@api.route('/photos/<id>/description', methods=['PUT'])
@jwt_required()
def put_description_photo(id):
	try:
		new_description = request.json['description']
		photo = Photo.query.filter_by(id=id).first()

		if photo:
			photo.description = new_description
			db.session.commit()
			return jsonify({'msg': 'Descrição atualizada'}), 200

		return jsonify({'error': 'A foto não existe'}), 404

	except:
		return jsonify({'error': 'Não foi possível atualizar'}), 500
