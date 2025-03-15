from flask import Flask, request, jsonify
from service import transcriber

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

    try:
        transcription = transcriber.transcribe(file)
    except Exception as e:
        print(e)
        return jsonify({"error": "Error reading the audio file"}), 400

    return jsonify({"transcription": transcription}), 200


if __name__ == '__main__':
    app.run(debug=True)
