import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';

export default async (input) => {
  const keyFilename = 'controllers/STT/missage-38c481f53476.json';
  const client = new SpeechClient({ keyFilename });

  const filename = `/Users/jihyojeon/Documents/Codeworks/Senior/Solo/Missage/server/uploads/${input}`;
  const encoding = 'LINEAR16';
  const sampleRateHertz = 16000;
  const languageCode = 'en-US';

  const config = {
    enableWordTimeOffsets: true,
    encoding: encoding,
    sampleRateHertz: sampleRateHertz,
    languageCode: languageCode,
  };

  const audio = {
    content: fs.readFileSync(filename).toString('base64'),
  };

  const request = {
    config: config,
    audio: audio,
  };

  // Detects speech in the audio file. This creates a recognition job that you
  // can wait for now, or get its result later.

  const [operation] = await client.longRunningRecognize(request);
  const [response] = await operation.promise();

  const sttOutput = {
    transcript: '',
    timestamp: [],
  };

  response.results.forEach((result) => {
    sttOutput.transcript = result.alternatives[0].transcript;
    result.alternatives[0].words.forEach((wordInfo) => {
      const startSecs =
        `${wordInfo.startTime.seconds}` +
        '.' +
        wordInfo.startTime.nanos / 100000000;
      const endSecs =
        `${wordInfo.endTime.seconds}` +
        '.' +
        wordInfo.endTime.nanos / 100000000;
      // console.log(`Word: ${wordInfo.word}`);
      // console.log(`\t ${startSecs} secs - ${endSecs} secs`);
      sttOutput.timestamp.push({ word: wordInfo.word, start: startSecs });
    });
  });

  return sttOutput.transcript;
};
