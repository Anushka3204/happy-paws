from flask import Blueprint, request, jsonify
from db import db

requests_bp = Blueprint("requests", __name__)

@requests_bp.route("/", methods=["GET"])
def get_requests():
    requests = list(db.requests.find({}, {"_id": 0}))
    return jsonify(requests)

@requests_bp.route("/", methods=["POST"])
def add_request():
    data = request.get_json()
    db.requests.insert_one(data)
    return jsonify({"message": "request added!"}), 201