from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120))
    email = db.Column(db.String(120), unique=True)
    phone_number = db.Column(db.String(20))
    password = db.Column(db.String(512))
    role = db.Column(db.String(20))  # "buyer" or "vendor"
    campus = db.Column(db.String(100))

    vendor_profile = db.relationship('VendorProfile', backref='user', uselist=False)
    is_google_account = db.Column(db.Boolean, default=False)

class VendorProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    store_name = db.Column(db.String(100))
    bio = db.Column(db.Text)
    status = db.Column(db.String(20), default="Pending")
    rating = db.Column(db.Float, default=4.5)
    verified = db.Column(db.Boolean, default=False)
    subscription_status = db.Column(db.String(20), default="Free")
    mpesa_number = db.Column(db.String(20))  # For Paystack payouts

class Listing(db.Model):
    __tablename__ = 'listings'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(200), nullable=True)

    price = db.Column(db.Integer, nullable=False)
    condition = db.Column(db.String(50), nullable=False)
    category = db.Column(db.String(50), nullable=False)

    vendor_id = db.Column(db.Integer, nullable=False)
    vendor_name = db.Column(db.String(100), nullable=False)
    vendor_whatsapp = db.Column(db.String(20), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "image_url": self.image_url,
            "price": self.price,
            "condition": self.condition,
            "category": self.category,
            "vendor_id": self.vendor_id,
            "vendor_name": self.vendor_name,
            "vendor_whatsapp": self.vendor_whatsapp
        }


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    buyer_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    vendor_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    total_amount = db.Column(db.Integer)
    items = db.Column(db.Text)  # JSON stringified
    status = db.Column(db.String(20), default="Pending")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class TokenBlocklist(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, index=True)
    created_at = db.Column(db.DateTime, nullable=False)