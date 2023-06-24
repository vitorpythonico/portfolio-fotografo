from flask_jwt_extended import jwt_required
from flask import jsonify, request

from . import api
from .. import db
from ..models import Profile

@api.route('/account/profile', methods=['GET'])
def get_profile():
	profile = Profile.query.first()

	profile_dict = {
		'email': profile.email,
		'instagram': profile.instagram,
		'whatsapp': profile.whatsapp
	}

	return jsonify(profile_dict)

@api.route('/account/profile', methods=['PUT'])
@jwt_required()
def put_profile():
	email = request.json['email']
	instagram = request.json['instagram']
	whatsapp = request.json['whatsapp']

	profile = Profile.query.first()
	profile.email = email
	profile.instagram = instagram
	profile.whatsapp = whatsapp

	db.session.commit()
	return jsonify({'msg': 'Dados atualizados com sucesso'}), 200
