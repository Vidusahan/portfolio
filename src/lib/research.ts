export interface PipelineNode {
  label: string;
  title: string;
  description: string;
}

export const RESEARCH_PIPELINE: PipelineNode[] = [
  {
    label: 'Ingestion',
    title: 'Audio ingestion',
    description: 'Raw audio input is resampled to a fixed sample rate so every source — regardless of original recording setup — enters the pipeline in a consistent format.',
  },
  {
    label: 'Preprocess',
    title: 'Preprocessing',
    description: 'Silence trimming and light noise reduction, so the model learns from speech content rather than recording-environment artifacts.',
  },
  {
    label: 'Features',
    title: 'Feature extraction',
    description: 'Audio is converted to mel-spectrograms — a time-frequency representation that makes the subtle artifacts synthetic speech leaves behind easier for a CNN to pick up.',
  },
  {
    label: 'Encoder',
    title: 'Model encoder',
    description: 'A convolutional encoder learns representations from the spectrogram, trained across multiple different voice-synthesis methods rather than just one.',
  },
  {
    label: 'Classify',
    title: 'Classification head',
    description: 'A binary head outputs real vs. synthetic, with the decision boundary tuned on a validation set that\u2019s held separate from training.',
  },
  {
    label: 'Calibrate',
    title: 'Cross-generator calibration',
    description: 'Confidence scores are calibrated against synthesis methods excluded from training — the step that actually tests whether the model generalizes.',
  },
];

export interface ResearchObjective {
  title: string;
  detail: string;
}

export const RESEARCH_OBJECTIVES: ResearchObjective[] = [
  {
    title: 'Generalize across synthesis methods',
    detail: 'Most detectors overfit to artifacts of one voice-cloning tool. The goal was a model that still works on generators it never saw in training.',
  },
  {
    title: 'Stay lightweight enough to run inline',
    detail: 'Detection is only useful if it can run fast enough to sit in a real pipeline, not just in an offline research notebook.',
  },
  {
    title: 'Quantify confidence, not just a label',
    detail: 'A bare real/fake label isn\u2019t enough for a production system — it needs a calibrated confidence score so downstream systems know when to trust it.',
  },
];

export interface ResearchDataset {
  name: string;
  description: string;
}

export const RESEARCH_DATASETS: ResearchDataset[] = [
  {
    name: 'ASVspoof 2021',
    description: 'A widely used benchmark for spoofed and synthetic speech detection, covering multiple attack types.',
  },
  {
    name: 'WaveFake',
    description: 'Synthetic speech generated across several different neural vocoder architectures.',
  },
  {
    name: 'In-the-Wild',
    description: 'Real-world deepfake audio samples collected from public sources, used as an out-of-distribution generalization test.',
  },
];

export interface ResultRow {
  generator: string;
  accuracy: number;
  inTrainingSet: boolean;
}

// Illustrative placeholder figures — replace with real experiment results.
export const RESEARCH_RESULTS: ResultRow[] = [
  { generator: 'Tacotron 2', accuracy: 97, inTrainingSet: true },
  { generator: 'WaveGlow', accuracy: 95, inTrainingSet: true },
  { generator: 'HiFi-GAN', accuracy: 93, inTrainingSet: true },
  { generator: 'Unseen generator A', accuracy: 84, inTrainingSet: false },
  { generator: 'Unseen generator B', accuracy: 79, inTrainingSet: false },
];

export const RESEARCH_FUTURE_WORK =
  'Expanding the training distribution further, and exploring self-supervised pretraining on raw audio waveforms instead of hand-engineered spectrogram features — early evidence elsewhere suggests this generalizes better to synthesis methods the model has never encountered.';

export interface PublicationInfo {
  status: 'in-preparation' | 'submitted' | 'published';
  venue: string;
  note: string;
  paperUrl?: string;
}

export const PUBLICATION: PublicationInfo = {
  status: 'in-preparation',
  venue: 'Target venue TBD',
  note: 'Write-up is in preparation ahead of submission — not yet public.',
};
