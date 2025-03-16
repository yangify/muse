"""
This module provides a Flask application with four endpoints:

1. A health check endpoint (/health) to verify the application's status.
2. A transcribe endpoint (/transcribe) that processes one or more uploaded MP3 files and returns their transcriptions.
3. A transcriptions endpoint (/transcriptions) to retrieve all stored transcriptions from the database.
4. A search endpoint (/search) that performs a full-text search on transcriptions based on the audio file name.
"""
from flask import Flask, Blueprint, request, jsonify
from flask_cors import CORS
from service import transcriber
from repository import db, ts_repo

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
db.init()


@app.route('/health', methods=['GET'])
def health_check():
    """
    Perform a health check.

    Returns:
        Tuple[Response, int]: A JSON response containing the application status
        and the HTTP status code.
    """
    return jsonify({"status": "healthy"}), 200


@app.route('/transcribe', methods=['POST'])
def transcribe_files():
    """
    Transcribe one or more uploaded MP3 files.

    Assumption: There can be multiple files uploaded with the same name.

    The endpoint expects multipart/form-data with files under the "files" field.
    On success, it returns a JSON response containing a "transcriptions" key with
    the results. In case of errors, a JSON response with an "error" key is returned.

    Returns:
        Tuple[Response, int]: A JSON response with either the transcriptions or an
        error message, along with the HTTP status code.
    """
    files = request.files.getlist('files')
    try:
        transcriptions = transcriber.transcribe_files(files)
        ts_repo.save_all(transcriptions)
    except Exception as e:
        print(e)
        return jsonify({"error": "Error transcribing files"}), 500

    return jsonify({"transcriptions": transcriptions}), 200


@app.route('/transcriptions', methods=['GET'])
def get_transcriptions():
    """
    Retrieve all stored transcriptions.

    Returns:
        Tuple[Response, int]: A JSON response containing all transcriptions
        and the associated HTTP status code.
    """
    transcriptions = ts_repo.get_all()
    return jsonify({"transcriptions": transcriptions}), 200


@app.route('/search', methods=['GET'])
def search_transcriptions():
    """
    Perform a full-text search on transcriptions based on the audio file name.

    Query Parameter:
        filename (str): The name (or part of the name) of the audio file to search for.

    Returns:
        Tuple[Response, int]: A JSON response containing the matching transcriptions
        or an error message along with the HTTP status code.
    """
    filename = request.args.get('filename', '').strip()
    if not filename:
        return jsonify({"error": "Filename query parameter is missing"}), 400

    try:
        results = ts_repo.search_by_filename(filename)
    except Exception as e:
        print(e)
        return jsonify({"error": "Error searching transcriptions"}), 500

    return jsonify({"transcriptions": results}), 200


if __name__ == '__main__':
    app.run(debug=True)
