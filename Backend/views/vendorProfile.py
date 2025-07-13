from flask import Blueprint, request, jsonify
from models import db, VendorProfile, User

vendor_profiles_bp = Blueprint('vendor_profiles', __name__)

# Create or update vendor profile
@vendor_profiles_bp.route('/vendor-profiles/<int:user_id>', methods=['PUT'])
def update_vendor_profile(user_id):
    data = request.get_json()
    store_name = data.get('store_name')
    bio = data.get('bio')

    if not store_name:
        return jsonify({"error": "Store name is required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    profile = VendorProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        profile = VendorProfile(user_id=user_id)
        db.session.add(profile)

    profile.store_name = store_name
    profile.bio = bio
    db.session.commit()

    return jsonify({"message": "Profile updated successfully"}), 200


# Get vendor profile
@vendor_profiles_bp.route('/vendor-profiles/<int:user_id>', methods=['GET'])
def get_vendor_profile(user_id):
    profile = VendorProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        return jsonify({"error": "Profile not found"}), 404

    return jsonify({
        "id": profile.id,
        "user_id": profile.user_id,
        "store_name": profile.store_name,
        "bio": profile.bio,
        "status": profile.status,
        "rating": profile.rating,
        "verified": profile.verified,
        "subscription_status": profile.subscription_status,
        "mpesa_number": profile.mpesa_number
    }), 200


# Delete vendor profile
@vendor_profiles_bp.route('/vendor-profiles/<int:user_id>', methods=['DELETE'])
def delete_vendor_profile(user_id):
    profile = VendorProfile.query.filter_by(user_id=user_id).first()
    if not profile:
        return jsonify({"error": "Profile not found"}), 404

    db.session.delete(profile)
    db.session.commit()

    return jsonify({"message": "Profile deleted successfully"}), 200