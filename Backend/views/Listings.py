from flask import Blueprint, request, jsonify
from models import db, Listing
import cloudinary.uploader
import os

listings_bp = Blueprint('listings_bp', __name__)

# GET all listings or by vendor_id
@listings_bp.route('/listings', methods=['GET'])
def get_listings():
    vendor_id = request.args.get('vendor_id')
    if vendor_id:
        listings = Listing.query.filter_by(vendor_id=vendor_id).all()
    else:
        listings = Listing.query.all()
    return jsonify([listing.to_dict() for listing in listings])


# GET single listing by ID
@listings_bp.route('/<int:id>', methods=['GET'])
def get_listing(id):
    listing = Listing.query.get_or_404(id)
    return jsonify(listing.to_dict())


# CREATE listing with Cloudinary image upload
@listings_bp.route('/listings', methods=['POST'])
def create_listing():
    try:
        title = request.form.get('title')
        description = request.form.get('description')
        price = int(request.form.get('price'))
        condition = request.form.get('condition')
        category = request.form.get('category')
        vendor_id = int(request.form.get('user_id'))
        vendor_name = request.form.get('vendor_name')
        vendor_whatsapp = request.form.get('vendor_whatsapp')
        image_file = request.files.get('image')

        image_url = None
        if image_file:
            upload_result = cloudinary.uploader.upload(
                image_file,
                folder="product_images",  # optional Cloudinary folder
                use_filename=True,
                unique_filename=True,
                resource_type="image"
            )
            image_url = upload_result.get("secure_url")

        listing = Listing(
            title=title,
            description=description,
            image_url=image_url,
            price=price,
            condition=condition,
            category=category,
            vendor_id=vendor_id,
            vendor_name=vendor_name,
            vendor_whatsapp=vendor_whatsapp
        )

        db.session.add(listing)
        db.session.commit()

        return jsonify({ "message": "Listing created", "listing": listing.to_dict() }), 201

    except Exception as e:
        db.session.rollback()
        import traceback
        traceback.print_exc()
        return jsonify({ "error": str(e) }), 500


# DELETE listing
@listings_bp.route('/<int:id>', methods=['DELETE'])
def delete_listing(id):
    listing = Listing.query.get(id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404
    db.session.delete(listing)
    db.session.commit()
    return jsonify({"message": "Listing deleted"}), 200


# UPDATE listing
@listings_bp.route('/<int:id>', methods=['PUT'])
def update_listing(id):
    listing = Listing.query.get(id)
    if not listing:
        return jsonify({"error": "Listing not found"}), 404

    data = request.get_json()
    try:
        listing.title = data.get('title', listing.title)
        listing.description = data.get('description', listing.description)
        listing.image_url = data.get('image_url', listing.image_url)
        listing.price = data.get('price', listing.price)
        listing.condition = data.get('condition', listing.condition)
        listing.category = data.get('category', listing.category)
        listing.vendor_name = data.get('vendor_name', listing.vendor_name)
        listing.vendor_whatsapp = data.get('vendor_whatsapp', listing.vendor_whatsapp)

        db.session.commit()
        return jsonify({"message": "Listing updated", "listing": listing.to_dict()})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Update failed", "details": str(e)}), 500
