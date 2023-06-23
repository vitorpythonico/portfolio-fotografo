from datetime import datetime
from flask import current_app as app
from flask_jwt_extended import (
		decode_token,
	)

from .. import db, jwt
from ..models import User, TokenBlockList

def add_token_to_database(token):
	decoded_token = decode_token(token)
	jti = decoded_token['jti']
	token_type = decoded_token['type']
	expires = datetime.fromtimestamp(decoded_token['exp'])
	user_id = decoded_token[app.config['JWT_IDENTITY_CLAIM']]

	token = TokenBlockList(
			jti=jti,
			token_type=token_type,
			expires=expires,
			user_id=user_id
		)

	db.session.add(token)
	db.session.commit()

def revoke_token(jti, user_id):
	token = TokenBlockList.query.filter_by(jti=jti, user_id=user_id).first()
	token.revoked_at = datetime.utcnow()
	db.session.commit()

@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_headers, jwt_payload):
	try:
		jti = jwt_payload['jti']
		user_id = jwt_payload[app.config['JWT_IDENTITY_CLAIM']]
		token = TokenBlockList.query.filter_by(jti=jti, user_id=user_id).first()

		if token and token.revoked_at:
			db.session.delete(token)
			db.session.commit()
			return True
		return False

	except:
		return True

@jwt.user_lookup_loader
def load_current_user(jwt_headers, jwt_payload):
	user_id = jwt_payload[app.config['JWT_IDENTITY_CLAIM']]
	return User.query.get(user_id)
