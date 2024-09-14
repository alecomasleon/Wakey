
import speech from "@google-cloud/speech"
// @ts-ignore
import * as recorder from 'node-record-lpcm16';

export default function listen() {
  const client = new speech.SpeechClient({
    keyFilename: './htnproject-fa322c7140ed.json'
  });

  const recognizeStream = client
    .streamingRecognize({
      config: {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
        enableSpeakerDiarization: true,
        model: 'latest_long',
      },
      interimResults: true,
    })
    .on('error', console.error)
    .on('data', (data) => {
      console.log(`Real time transcript: ${data.results[0]?.alternatives?.[0]?.transcript} [isFinal: ${data.results[0]?.isFinal}]`);
      if (data.results[0]?.isFinal) console.log("END")
    });

  // Create a writable stream to save the captured audio
  const audioStream = recorder.record({
      sampleRate: 16000, // Sample rate (adjust as needed)
      channels: 1, // Mono audio
      audioType: 'raw', // Output audio type
  }).stream();

  audioStream.on('end', () => {
      recognizeStream.end();
  });

  audioStream.pipe(recognizeStream);
}

if (require.main === module) {
  listen()
}