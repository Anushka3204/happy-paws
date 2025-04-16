from flask import Blueprint, request, jsonify
from db import db

users_bp = Blueprint("users", __name__)

@users_bp.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if db.users.find_one({"email": email}):
        return jsonify({"error": "Email already registered"}), 409

    db.users.insert_one({"name": name, "email": email, "password": password})
    return jsonify({"message": "Signup successful!"}), 201

@users_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Email and password are required"}), 400

    user = db.users.find_one({"email": email})
    
    if user and user.get("password") == password:
        return jsonify({"message": "Login successful", "user": {"email": user["email"], "name": user.get("name", "")}})
    else:
        return jsonify({"error": "Invalid email or password"}), 401
