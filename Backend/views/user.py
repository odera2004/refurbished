from flask import Blueprint, request, jsonify
from models import db
from models import db, User, VendorProfile
from werkzeug.security import generate_password_hash
# from flask_jwt_extended import create_access_token


user_bp = Blueprint('user_bp', __name__)

@user_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()
        username = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Check if user exists
        user_exists = User.query.filter((User.username == username) | (User.email == email)).first()
        if user_exists:
            return jsonify({"error": "Username or email already exists"}), 409

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, email=email, password=hashed_password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "User registered successfully",
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email
            }
        }), 201

    except Exception as e:
        print("Registration error:", e)
        return jsonify({"error": "Something went wrong"}), 500


@user_bp.route('/', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users])

@user_bp.route('/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200