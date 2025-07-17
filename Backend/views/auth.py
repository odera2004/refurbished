from flask import jsonify, request, Blueprint
from models import db, User, TokenBlocklist
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, create_access_token
from werkzeug.security import check_password_hash, generate_password_hash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from datetime import datetime, timezone
from google.oauth2 import id_token
from google.auth.transport import requests as grequests
import os
from flask_cors import cross_origin

auth_bp = Blueprint('auth', __name__)

# Secure serializer using secret from .env
serializer = URLSafeTimedSerializer(os.getenv("SECRET_KEY", "fallback-secret-key"))

# --- Login with Email/Password ---
@auth_bp.route('/login', methods=['POST'])
@cross_origin(origins=["https://sokolawanafunzi.vercel.app"], supports_credentials=True)
def login():

    data = request.get_json()

    user = User.query.filter_by(email=data.get('email')).first()

    if user and check_password_hash(user.password, data.get('password')):
        access_token = create_access_token(identity=user.id)  # ✅ REAL JWT
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "full_name": user.full_name,
                "email": user.email,
                "role": user.role,
                "campus": user.campus
            },
            "access_token": access_token
        }), 200
    else:
        return jsonify({"message": "Invalid email or password"}), 401


@auth_bp.route('/google', methods=['POST', 'OPTIONS'])
@cross_origin(origins="http://localhost:5173", supports_credentials=True)
def google_register():
    from models import User  # your User model

    data = request.get_json()
    token = data.get('token')

    try:
        idinfo = id_token.verify_oauth2_token(
            token,
            grequests.Request(),
            os.getenv("GOOGLE_CLIENT_ID")
        )

        email = idinfo.get("email")
        name = idinfo.get("name") or email.split('@')[0]

        user = User.query.filter_by(email=email).first()

        if not user:
            user = User(
                full_name=name,
                email=email,
                phone_number='',
                password=generate_password_hash(os.urandom(12).hex()),
                role='buyer',
                campus='',
                is_google_account=True  # Optional flag
            )
            db.session.add(user)
            db.session.commit()

        return jsonify({"message": "Google registration successful"}), 200

    except Exception as e:
        print("Google registration error:", e)
        return jsonify({"error": "Invalid Google token"}), 400


# --- Get Current User ---
@auth_bp.route('/current_user', methods=['GET'])
@jwt_required()
def current_user():
    user = User.query.get(get_jwt_identity())
    if not user:
        return jsonify({"error": "User not found"}), 404

    return jsonify({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'password': user.password,
        'role': user.role
    }), 200

# --- Logout ---
@auth_bp.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    db.session.add(TokenBlocklist(jti=jti, created_at=datetime.now(timezone.utc)))
    db.session.commit()
    return jsonify({"message": "Logged out successfully"}), 200


# --- Reset Password ---
# @auth_bp.route('/reset-password/<token>', methods=['POST'])
# def reset_password(token):
#     new_password = request.get_json().get('password')
#     if not new_password:
#         return jsonify({"error": "Password is required"}), 400

#     try:
#         email = serializer.loads(token, salt="password-reset", max_age=1800)
#     except SignatureExpired:
#         return jsonify({"error": "Token has expired"}), 400
#     except BadSignature:
#         return jsonify({"error": "Invalid token"}), 400

#     user = User.query.filter_by(email=email).first()
#     if not user:
#         return jsonify({"error": "User not found"}), 404

#     user.password = generate_password_hash(new_password)
#     db.session.commit()
#     return jsonify({"message": "Password reset successful"}), 200