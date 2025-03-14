import os
import tempfile
from service import transcriber
from flask import Flask, request, jsonify

app = Flask(__name__)


@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200


@app.route('/transcribe', methods=['POST'])
def transcribe():
    file = request.files['file']
    if not file:
        return jsonify({"error": "No file part"}), 400
    if not file.filename.endswith(".mp3"):
        return jsonify({"error": "Invalid file format. Please upload an MP3 file."}), 400

    filename = file.filename
    temp_dir = tempfile.TemporaryDirectory()
    temp_file_path = os.path.join(temp_dir.name, filename)
    file.save(temp_file_path)

    try:
        transcription = transcriber.transcribe(temp_file_path)
    except Exception as e:
        print(e)
        return jsonify({"error": "Error reading the audio file"}), 400

    return jsonify({"transcription": transcription}), 200


if __name__ == '__main__':
    app.run(debug=True)
