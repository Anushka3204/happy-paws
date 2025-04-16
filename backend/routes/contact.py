from flask import Blueprint, request, jsonify
from db import db

contact_bp = Blueprint("contact", __name__)

@contact_bp.route("/", methods=["POST"])
def submit_contact():
    data = request.get_json()
    db.messages.insert_one(data)
    return jsonify({"message": "Message received!"}), 201

