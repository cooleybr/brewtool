from gevent.pywsgi import WSGIServer
from api import srvr

http_server = WSGIServer(('', 5000), srvr.flasky)
http_server.serve_forever()
