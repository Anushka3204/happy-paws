from flask import Blueprint, request, jsonify
from db import db

pets_bp = Blueprint("pets", __name__)

@pets_bp.route("/", methods=["GET"])
def get_pets():
    pets = list(db.pets.find({}, {"_id": 0}))
    return jsonify(pets)

@pets_bp.route("/", methods=["POST"])
def add_pet():
    data = request.get_json()
    db.pets.insert_one(data)
    return jsonify({"message": "Pet added!"}), 201
