from flask.blueprints import Blueprint
from ..models import Photo, Album

api = Blueprint('api', __name__, static_folder='../images')

@api.route('/api/albums/<album>', methods=['POST'])
def get_album(album):
	if album == 'recent':
		photos = Photo.get_by_recent_date() 
		return photos

	photos = Photo.get_by_album(album=album)
	return photos

def init_bp(app):
	app.register_blueprint(api)
