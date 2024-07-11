from flask import Flask
from flask_cors import CORS
from controllers.customer_controller import customer_bp

app = Flask(__name__)
CORS(app)

# Register Blueprints
app.register_blueprint(customer_bp)

# Run the application
if __name__ == "__main__":
    app.run(debug=True)
