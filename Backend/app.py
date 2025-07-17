from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from datetime import timedelta
from dotenv import load_dotenv
import os
import cloudinary
import cloudinary.uploader

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max upload


# Enable CORS for your frontend
CORS(app, supports_credentials=True, origins=["http://localhost:5173", "https://refurbished-1.vercel.app"])

# Load environment-based config
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL")
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)


# Initialize extensions
from models import db, TokenBlocklist
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Cloudinary configuration
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)

# Blueprints
from views import user_bp, listings_bp, vendor_profiles_bp, auth_bp
app.register_blueprint(user_bp)
app.register_blueprint(listings_bp)
app.register_blueprint(vendor_profiles_bp)
app.register_blueprint(auth_bp)

# Route to serve uploaded images

# JWT token blocklist check
@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None

# Optional root route
@app.route("/")
def index():
    return {"message": "Soko Backend is running 🎉"}

