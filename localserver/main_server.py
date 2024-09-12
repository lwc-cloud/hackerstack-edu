from flask import Flask, redirect, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    return "Hello, HTTPS!"

if __name__ == '__main__':
    app.run(ssl_context='adhoc',host='0.0.0.0')
