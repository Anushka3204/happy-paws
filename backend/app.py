from flask import Flask
from flask_cors import CORS
from routes.pets import pets_bp
from routes.contact import contact_bp
from routes.request import requests_bp
from routes.users import users_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(pets_bp, url_prefix="/api/pets")
app.register_blueprint(contact_bp, url_prefix="/api/contact")
app.register_blueprint(requests_bp, url_prefix="/api/request")
app.register_blueprint(users_bp, url_prefix="/api/users")

if __name__ == "__main__":
    app.run(debug=True)
