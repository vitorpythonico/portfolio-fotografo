from . import api
from ..models import Photo, Album

@api.route('/albums/<album>', methods=['GET'])
def get_album(album):
	if album == 'recentes':
		photos = Photo.get_by_recent_date() 
		return photos

	photos = Photo.get_by_album(album=album)
	return photos
