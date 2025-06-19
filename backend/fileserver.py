from flask import Flask, send_from_directory, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = "C:/WebShared"

@app.route('/api/<path:subpath>')
@app.route('/api/', defaults={'subpath': ''})
def browse(subpath):
    full_path = os.path.join(BASE_DIR, subpath)
    if os.path.isdir(full_path):
        items = []
        for item in os.listdir(full_path):
            item_path = os.path.join(full_path, item)
            items.append({
                "name": item,
                "is_dir": os.path.isdir(item_path),
                "path": os.path.join(subpath, item).replace("\\", "/")
            })
        return jsonify({"path": subpath, "items": items})
    elif os.path.isfile(full_path):
        return send_from_directory(os.path.dirname(full_path), os.path.basename(full_path), as_attachment=True)
    return "Not Found", 404

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
