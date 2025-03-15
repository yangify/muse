"""
This module provides a Flask application with three endpoints:
- A health check endpoint to verify the application's status.
- A transcribe endpoint that processes an uploaded MP3 file and returns its transcription.
- A transcriptions endpoint to retrieve all stored transcriptions from the database.
"""

from flask import Flask, request, jsonify
from service import transcriber
from repository import db, ts_repo

app = Flask(__name__)
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
def transcribe():
    """
    Transcribe an uploaded MP3 file.

    The function expects a file named 'file' (must be .mp3). It handles any transcription
    exceptions and returns the result or error in JSON format.

    Returns:
        Tuple[Response, int]: A JSON response containing either the transcription
        or an error message along with the HTTP status code.
    """
    file = request.files['file']
    if not file:
        return jsonify({"error": "No file part"}), 400
    if not file.filename.endswith(".mp3"):
        return jsonify({"error": "Invalid file format. Please upload an MP3 file."}), 400

    try:
        transcription = transcriber.transcribe(file)
    except Exception as e:
        print(e)
        return jsonify({"error": "Error reading the audio file"}), 400

    try:
        ts_repo.save(file.filename, transcription)
    except Exception as e:
        print(e)
        return jsonify({"error": "Error saving the transcription"}), 400

    return jsonify({"transcription": transcription}), 200


@app.route('/transcriptions', methods=['GET'])
def get_transcriptions():
    """
    Retrieve all stored transcriptions.

    Returns:
        Tuple[Response, int]: A JSON response containing all transcriptions
        and the associated HTTP status code.
    """
    transcriptions = ts_repo.get_all()
    return jsonify(transcriptions), 200


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

    if not results:
        return jsonify({"error": "No transcriptions found matching the filename"}), 404

    return jsonify(results), 200


if __name__ == '__main__':
    app.run(debug=True)
