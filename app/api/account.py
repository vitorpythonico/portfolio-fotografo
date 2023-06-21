from flask import request, jsonify, current_app as app
from flask_jwt_extended import (
	create_access_token, 
	create_refresh_token,
	jwt_required,
	get_jwt_identity,
	get_jwt,
	get_current_user
	)

from . import api
from .utils import *

@api.route('/account/validate_token', methods=['POST'])
@jwt_required()
def validate_token():
	current_user = get_current_user()
	if not current_user:
		return jsonify({'error': 'Invalid token'})

	access_token = get_jwt()
	return jsonify({'access_token': access_token})

@api.route('/account/login', methods=['POST'])
def login():
	username = request.json['username']
	password = request.json['password']

	user = User.query.filter_by(username=username).first()

	if not user or not user.verify_password(password):
		return jsonify({'error': 'Usuário ou senha inválido'})

	access_token = create_access_token(identity=user.id)
	refresh_token = create_refresh_token(identity=user.id)
	add_token_to_database(access_token)
	add_token_to_database(refresh_token)

	return jsonify({'access_token': access_token, 'refresh_token': refresh_token})

@api.route('/account/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_access_token():
	user_id = get_jwt_identity()
	access_token = create_access_token(identity=user_id)
	add_token_to_database(access_token)

	return jsonify({'access_token': access_token})

@api.route('/account/revoke_access', methods=['DELETE'])
@jwt_required()
def revoke_access_token():
	jti = get_jwt()['jti']
	user_id = get_jwt_identity()
	revoke_token(jti, user_id)

	return jsonify({'msg': 'Access token revoked'})

@api.route('/account/revoke_refresh', methods=['DELETE'])
@jwt_required(refresh=True)
def revoke_refresh_token():
	jti = get_jwt()['jti']
	user_id = get_jwt_identity()
	revoke_token(jti, user_id)

	return jsonify({'msg': 'Refresh token revoked'})
