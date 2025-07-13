from flask import Flask
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from datetime import timedelta
from models import db, TokenBlocklist
from flask_cors import CORS

app = Flask(__name__, static_folder='static', static_url_path='/static')


CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# ✅ Set your DB name
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///lost.db'

# ✅ JWT Config
app.config["JWT_SECRET_KEY"] = "vghsdvvsjvy436u4wu37118gcd#"  # Replace with env variable in production
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)

# ✅ Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# from views import *

# app.register_blueprint(user_bp)
# app.register_blueprint(listings_bp)
# app.register_blueprint(vendor_profiles_bp)
# app.register_blueprint(auth_bp)


@jwt.token_in_blocklist_loader
def check_if_token_revoked(jwt_header, jwt_payload: dict) -> bool:
    jti = jwt_payload["jti"]
    token = db.session.query(TokenBlocklist.id).filter_by(jti=jti).scalar()
    return token is not None