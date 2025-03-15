"""
This module provides functionalities for audio processing and transcription using a Whisper model.

It includes:
1. A helper function (resample_to_16k) to ensure audio data is at a 16 kHz sample rate.
2. A function (transcribe_file) to read and transcribe a single audio file.
3. A function (transcribe_files) to handle multiple file transcriptions in bulk.
4. A utility function (is_valid_file) to verify the file format before processing.
"""

import os
import tempfile

import soundfile
import librosa
from transformers import WhisperProcessor, WhisperForConditionalGeneration

processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")


def is_valid_file(audio_file):
    """
    Validate an audio file based on basic criteria, such as checking file extension.

    Args:
        audio_file (FileStorage): The file-like object representing the audio file.

    Returns:
        bool: True if the file is deemed valid, False otherwise.
    """
    return audio_file is not None and audio_file.filename.endswith(".mp3")


def resample_to_16k(audio_data, orig_sr):
    """
    Resample audio data to 16 kHz if it is not already at that sampling rate.

    Args:
        audio_data (numpy.ndarray): The raw audio samples.
        orig_sr (int): The original sample rate of the audio data.

    Returns:
        tuple:
            - (numpy.ndarray): Audio data resampled to 16 kHz.
            - (int): The sample rate after resampling (16 kHz or unchanged if originally 16 kHz).
    """
    if orig_sr == 16000:
        return audio_data, orig_sr
    return librosa.resample(audio_data, orig_sr=orig_sr, target_sr=16000), 16000


def transcribe_file(audio_file):
    """
    Transcribe an audio file using the Whisper model.

    This function temporarily saves the provided file, resamples it if necessary,
    and then runs it through the model for transcription.

    Args:
        audio_file (FileStorage): The file-like object containing audio data.

    Returns:
        dict:
            A dictionary containing:
            - "filename": The filename of the audio.
            - "transcription": The recognized text from the audio.
    """
    if not is_valid_file(audio_file): return

    # Store file temporarily
    filename = audio_file.filename
    temp_dir = tempfile.TemporaryDirectory()
    audio_file_path = os.path.join(temp_dir.name, filename)
    audio_file.save(audio_file_path)

    # Resample(if needed) and transcribe
    audio_data, sampling_rate = soundfile.read(audio_file_path)
    audio_data, sampling_rate = resample_to_16k(audio_data, sampling_rate)
    inputs = processor(audio_data, sampling_rate=sampling_rate, return_tensors="pt")
    generated_ids = model.generate(inputs['input_features'])
    return {'filename': filename, 'transcription': processor.batch_decode(generated_ids, skip_special_tokens=True)[0]}


def transcribe_files(audio_files):
    """
    Transcribe multiple audio files using the Whisper model.

    Args:
        audio_files (list): A list of file-like objects representing audio files.

    Returns:
        list:
            A list of dictionaries with filename and transcription for each valid audio file.
    """
    return [transcribe_file(audio_file) for audio_file in audio_files if is_valid_file(audio_file)]
