from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_cors import CORS
from dotenv import load_dotenv
import os
import cloudinary
import cloudinary.uploader

from models import db, TokenBlocklist

# Load environment variables
load_dotenv()

# Validate required env vars
required_env = [
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "DATABASE_URL",
    "JWT_SECRET_KEY"
]

for var in required_env:
    if not os.getenv(var):
        raise RuntimeError(f"Environment variable {var} is not set!")

# Cloudinary Configuration
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# Flask App Configuration
app = Flask(__name__, static_folder='static', static_url_path='/static')

# CORS Configuration
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173", 
    "https://your-frontend-url.com"  # ✅ Replace with your actual frontend URL
]}})

# App Config
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Register Blueprints
from views import user_bp, listings_bp, vendor_profiles_bp, auth_bp
app.register_blueprint(user_bp)
app.register_blueprint(listings_bp)
app.register_blueprint(vendor_profiles_bp)
app.register_blueprint(auth_bp)

# JWT token blocklist
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None
