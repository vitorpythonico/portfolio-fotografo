from werkzeug.security import generate_password_hash
from flask import request, jsonify, current_app as app
from flask_jwt_extended import (
	create_access_token, 
	create_refresh_token,
	jwt_required,
	get_jwt_identity,
	get_jwt,
	get_current_user,
)

from ..models import User, TokenBlockList
from . import api
from .utils import *

@api.route('/account', methods=['GET'])
@jwt_required()
def get_account():
	user = User.query.first()

	user_dict = {
		'username': user.username,
		'password': user._clean_password,
		'recovery_email': user.recovery_email,
	}

	return jsonify(user_dict), 200

@api.route('/account', methods=['PUT'])
@jwt_required()
def put_account():
	username = request.json['username']
	password = request.json['password']
	recovery_email = request.json['recovery_email']

	user = User.query.first()
	user.username = username
	user.password = generate_password_hash(password)
	user._clean_password = password
	user.recovery_email = recovery_email

	db.session.commit()
	return jsonify({'msg': 'Dados atualizados com sucesso'}), 200

@api.route('/account/login', methods=['POST'])
def login():
	username = request.json['username']
	password = request.json['password']

	user = User.query.filter_by(username=username).first()

	if not user or not user.verify_password(password):
		return jsonify({'error': 'Usuário ou senha inválido'}), 401

	access_token = create_access_token(identity=user.id)
	refresh_token = create_refresh_token(identity=user.id)
	add_token_to_database(access_token)
	add_token_to_database(refresh_token)

	return jsonify({'access_token': access_token, 'refresh_token': refresh_token}), 200

@api.route('/account/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh_access_token():
	user_id = get_jwt_identity()
	access_token = create_access_token(identity=user_id)
	add_token_to_database(access_token)

	return jsonify({'access_token': access_token}), 200

@api.route('/account/revoke_access', methods=['DELETE'])
@jwt_required()
def revoke_access_token():
	jti = get_jwt()['jti']
	user_id = get_jwt_identity()
	revoke_token(jti, user_id)

	return jsonify({'msg': 'Access token revogado'}), 200

@api.route('/account/revoke_refresh', methods=['DELETE'])
@jwt_required(refresh=True)
def revoke_refresh_token():
	jti = get_jwt()['jti']
	user_id = get_jwt_identity()
	revoke_token(jti, user_id)

	return jsonify({'msg': 'Refresh token revogado'}), 200

@api.route('/account/reset_password', methods=['POST'])
def reset_password():
	HandlerResetPassword.generate_code()

	email_sent = HandlerResetPassword.send_email()
	if email_sent:
		return jsonify({'msg': 'sucess', 'reset_code': HandlerResetPassword.reset_code}), 200

	return jsonify({'error': 'Não foi possível enviar o email'}), 500

@api.route('/account/validate_reset_code', methods=['POST'])
def validate_reset_code():
	reset_code = request.json['reset_code']
	is_valid_code = HandlerResetPassword.validate_code(reset_code)
	if is_valid_code:
		return jsonify({'msg': 'O código foi validado com sucesso'}), 200

	return jsonify({'error': 'Código inválido'}), 401

@api.route('/account/new_password', methods=['POST'])
def new_password():
	try:
		new_password = request.json['password']

		user = User.query.first()
		user.password = generate_password_hash(new_password)
		user._clean_password = new_password

		db.session.commit()
		return jsonify({'msg': 'Senha atualizada com sucesso'}), 200
	except:
		return jsonify({'error': 'Não foi possível atualizar a senha'}), 500
