from flask import Blueprint, request, jsonify
from models import db
from models import db, User, VendorProfile
from werkzeug.security import generate_password_hash
# from flask_jwt_extended import create_access_token


user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    # Check if email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already registered"}), 400

    user = User(
        full_name=data['full_name'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        phone_number=data['phone_number'],
        role=data['role'],
        campus=data['campus']
    )

    db.session.add(user)
    db.session.commit()

    # ✅ Create VendorProfile if role is 'vendor'
    if user.role == 'vendor':
        vendor_profile = VendorProfile(
            user_id=user.id,
            store_name=f"{user.full_name}'s Store",  # Optional default name
            bio="",
            status="Pending",
            verified=False,
            subscription_status="Free"
        )
        db.session.add(vendor_profile)
        db.session.commit()

    return jsonify({
        "message": "User registered successfully",
        "user": {
            "id": user.id,
            "role": user.role
        }
    }), 201

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