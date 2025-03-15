"""
Provides functions to handle audio resampling and transcription using a Whisper model.

This module contains:
1. A helper function to resample audio to 16 kHz if needed.
2. A function to read and transcribe audio files using a Whisper model.
"""

import os
import tempfile

import soundfile
import librosa
from transformers import WhisperProcessor, WhisperForConditionalGeneration

processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")


def resample_to_16k(audio_data, orig_sr):
    """
    Resample audio data to 16 kHz if it is not already at that sampling rate.

    Args:
        audio_data (numpy.ndarray): The audio samples.
        orig_sr (int): The original sampling rate of the audio.

    Returns:
        tuple:
            - numpy.ndarray: The audio data resampled to 16 kHz.
            - int: The new sampling rate (16 kHz or unchanged if already at 16 kHz).
    """
    if orig_sr == 16000:
        return audio_data, orig_sr
    return librosa.resample(audio_data, orig_sr=orig_sr, target_sr=16000), 16000


def transcribe(audio_file):
    """
    Transcribe an audio file using the Whisper model.

    The function temporarily saves the provided audio file, resamples it (if necessary),
    and then feeds it to the Whisper model for transcription.

    Args:
        audio_file (FileStorage): The audio file to transcribe.

    Returns:
        str: The transcribed text of the audio.
    """
    filename = audio_file.filename
    temp_dir = tempfile.TemporaryDirectory()
    audio_file_path = os.path.join(temp_dir.name, filename)
    audio_file.save(audio_file_path)

    audio_data, sampling_rate = soundfile.read(audio_file_path)
    audio_data, sampling_rate = resample_to_16k(audio_data, sampling_rate)
    inputs = processor(audio_data, sampling_rate=sampling_rate, return_tensors="pt")
    generated_ids = model.generate(inputs['input_features'])
    return processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
