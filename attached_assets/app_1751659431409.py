from flask import Flask, send_file
from routes.generate_layout import generate_layout

app = Flask(__name__)
app.register_blueprint(generate_layout)

@app.route("/")
def home():
    return "🪴 EMI Landscape App Backend is running!"

@app.route('/download-blueprint')
def download_dxf():
    return send_file("gpt_blueprint.dxf", as_attachment=True)

if __name__ == "__main__":
    app.run(debug=True)
