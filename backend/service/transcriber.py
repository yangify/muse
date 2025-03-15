import os
import tempfile

import soundfile
import librosa
from transformers import WhisperProcessor, WhisperForConditionalGeneration

processor = WhisperProcessor.from_pretrained("openai/whisper-tiny")
model = WhisperForConditionalGeneration.from_pretrained("openai/whisper-tiny")


def resample_to_16k(audio_data, orig_sr):
    if orig_sr == 16000:
        return audio_data, orig_sr
    return librosa.resample(audio_data, orig_sr=orig_sr, target_sr=16000), 16000


def transcribe(audio_file):
    filename = audio_file.filename
    temp_dir = tempfile.TemporaryDirectory()
    audio_file_path = os.path.join(temp_dir.name, filename)
    audio_file.save(audio_file_path)

    audio_data, sampling_rate = soundfile.read(audio_file_path)
    audio_data, sampling_rate = resample_to_16k(audio_data, sampling_rate)
    inputs = processor(audio_data, sampling_rate=sampling_rate, return_tensors="pt")
    generated_ids = model.generate(inputs['input_features'])
    return processor.batch_decode(generated_ids, skip_special_tokens=True)[0]
