import secrets
import datetime
from flask import current_app as app
from flask_jwt_extended import decode_token
from flask_mail import Message

from .. import db, jwt, mail
from ..models import User, TokenBlockList

def add_token_to_database(token):
	decoded_token = decode_token(token)
	jti = decoded_token['jti']
	token_type = decoded_token['type']
	expires = datetime.datetime.fromtimestamp(decoded_token['exp'])
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
	if token:
		token.revoked_at = datetime.datetime.utcnow()
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

class HandlerResetPassword:
	reset_code = None
	revoked = True
	created_at = None

	@classmethod
	def send_email(self):
		try:
			template = f"""
				<h1>Copie e cole esse código (<b>com cuidado</b>) onde lhe foi pedido, se errar, um novo código deverá ser gerado</h1>
				<h2>Código: {self.reset_code}</h2>
				"""
			recovery_email = User.query.first().recovery_email

			msg = Message('Código de acesso', recipients=[recovery_email])
			msg.body = f"Copie e cole esse código (com cuidado) onde lhe foi pedido, se errar, um novo código deverá ser gerado. Código: {self.reset_code}"
			msg.html = template
			mail.send(msg)
			return True

		except:
			return False

	@classmethod
	def generate_code(self):
		self.reset_code = int(''.join(secrets.choice('0123456789') for i in range(6)))
		self.revoked = False
		self.created_at = datetime.datetime.now()

	@classmethod
	def validate_code(self, code):
		if not self.__is_revoked():
			self.revoked = True
			return int(code) == self.reset_code
		return False

	@classmethod
	def __is_revoked(self):
		return self.created_at + datetime.timedelta(minutes=20) < datetime.datetime.now() or self.revoked == True
