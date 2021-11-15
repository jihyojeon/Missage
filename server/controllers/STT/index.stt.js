import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import { exec } from 'child_process';

export default async (input) => {
  const timestamp = false;
  const keyFilename = 'controllers/STT/missage-38c481f53476.json';
  const client = new SpeechClient({ keyFilename });
  const filename = `/Users/jihyojeon/Documents/Codeworks/Senior/Solo/Missage/server/uploads/${input}`;

  const encoding = 'LINEAR16';
  // 16000 | 44100 | 48000
  let sampleRateHertz = 44100;
  if (input === 'User_Recorded.wav.wav') {
    sampleRateHertz = 48000;
  }
  const languageCode = 'en-US';

  const config = {
    enableWordTimeOffsets: true,
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };

  const audio = {
    content: fs.readFileSync(`${filename}`).toString('base64'),
  };

  const request = {
    config: config,
    audio: audio,
  };

  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();

  const sttOutput = {
    transcript: '',
    timestamp: [],
  };

  response.results.forEach((result) => {
    sttOutput.transcript += result.alternatives[0].transcript;
    if (timestamp) {
      result.alternatives[0].words.forEach((wordInfo) => {
        const startSecs =
          `${wordInfo.startTime.seconds}` +
          '.' +
          wordInfo.startTime.nanos / 100000000;
        const endSecs =
          `${wordInfo.endTime.seconds}` +
          '.' +
          wordInfo.endTime.nanos / 100000000;
        console.log(`Word: ${wordInfo.word}`);
        console.log(`\t ${startSecs} secs - ${endSecs} secs`);
        sttOutput.timestamp.push({ word: wordInfo.word, start: startSecs });
      });
    }
  });

  console.log(sttOutput.transcript);
  return sttOutput.transcript;
};
