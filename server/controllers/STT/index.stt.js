import { SpeechClient } from '@google-cloud/speech';

const keyFilename = 'missage-38c481f53476.json';
const client = new SpeechClient({ keyFilename });

const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';
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
  uri: gcsUri,
};

const request = {
  config: config,
  audio: audio,
};

// Detects speech in the audio file. This creates a recognition job that you
// can wait for now, or get its result later.
const [operation] = await client.longRunningRecognize(request);
const [response] = await operation.promise();

response.results.forEach((result) => {
  console.log(`Transcription: ${result.alternatives[0].transcript}`);
  result.alternatives[0].words.forEach((wordInfo) => {
    // NOTE: If you have a time offset exceeding 2^32 seconds, use the
    // wordInfo.{x}Time.seconds.high to calculate seconds.
    const startSecs =
      `${wordInfo.startTime.seconds}` +
      '.' +
      wordInfo.startTime.nanos / 100000000;
    const endSecs =
      `${wordInfo.endTime.seconds}` + '.' + wordInfo.endTime.nanos / 100000000;
    console.log(`Word: ${wordInfo.word}`);
    console.log(`\t ${startSecs} secs - ${endSecs} secs`);
  });
});
