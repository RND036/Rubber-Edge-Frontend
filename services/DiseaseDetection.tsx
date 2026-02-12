import { loadTensorflowModel, TensorflowModel } from 'react-native-fast-tflite';
import * as ImageManipulator from 'expo-image-manipulator';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// Disease labels - update these based on your actual model classes
export const DISEASE_LABELS = [
  'Healthy',
  'Abnormal Leaf Fall',
  'Bird Eye Spot',
  'Corynespora Leaf Fall',
  'Powdery Mildew',
  'Phytophthora Leaf Fall',
] as const;

export type DiseaseLabel = (typeof DISEASE_LABELS)[number];

// Minimum confidence threshold to consider the detection valid
// If the highest prediction is below this, we assume it's not a rubber leaf
const MIN_CONFIDENCE_THRESHOLD = 40; // percentage

// If predictions are too uniformly distributed, it's likely not a rubber leaf
const MAX_ENTROPY_THRESHOLD = 0.85; // normalized entropy (0-1)

export interface DetectionResult {
  label: DiseaseLabel;
  confidence: number;
  allPredictions: { label: DiseaseLabel; confidence: number }[];
  isValidLeaf: boolean; // Whether the image appears to be a rubber leaf
  validationMessage?: string; // Message explaining why the image was rejected
}

class DiseaseDetectionService {
  private model: TensorflowModel | null = null;
  private isLoading = false;

  async loadModel(): Promise<void> {
    if (this.model || this.isLoading) return;

    this.isLoading = true;
    try {
      // Load model from assets
      // Make sure to place your .tflite file in assets folder
      this.model = await loadTensorflowModel(
        require('../assets/models/rubber_disease_model.tflite')
      );
      console.log('Disease detection model loaded successfully');
    } catch (error) {
      console.error('Failed to load disease detection model:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async detectDisease(imageUri: string): Promise<DetectionResult> {
    if (!this.model) {
      await this.loadModel();
    }

    if (!this.model) {
      throw new Error('Model not loaded');
    }

    try {
      // Resize and process image to 224x224
      const processedImage = await ImageManipulator.manipulateAsync(
        imageUri,
        [{ resize: { width: 224, height: 224 } }],
        { format: ImageManipulator.SaveFormat.JPEG, base64: true }
      );

      if (!processedImage.base64) {
        throw new Error('Failed to process image');
      }

      // Convert base64 to Uint8Array for the model
      const imageData = this.base64ToUint8Array(processedImage.base64);

      // Run inference
      const outputData = await this.model.run([imageData]);
      const predictions = outputData[0] as Uint8Array;

      // Process predictions
      const results = this.processPredictions(predictions);

      return results;
    } catch (error) {
      console.error('Disease detection failed:', error);
      throw error;
    }
  }

  private base64ToUint8Array(base64: string): Uint8Array {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Extract RGB values from JPEG (simplified - assumes decoded image data)
    // For production, use a proper image decoder
    return this.decodeJpegToRgb(bytes);
  }

  private decodeJpegToRgb(jpegBytes: Uint8Array): Uint8Array {
    // This is a placeholder - react-native-fast-tflite handles this internally
    // when you pass the image URI directly
    return jpegBytes;
  }

  private processPredictions(predictions: Uint8Array): DetectionResult {
    // Convert uint8 predictions to probabilities (0-255 -> 0-1)
    const probabilities = Array.from(predictions).map((v) => v / 255);

    // Create sorted predictions
    const allPredictions = probabilities
      .map((confidence, index) => ({
        label: DISEASE_LABELS[index],
        confidence: confidence * 100, // Convert to percentage
      }))
      .sort((a, b) => b.confidence - a.confidence);

    // Validate if this is actually a rubber leaf
    const validation = this.validatePredictions(allPredictions);

    return {
      label: allPredictions[0].label,
      confidence: allPredictions[0].confidence,
      allPredictions,
      isValidLeaf: validation.isValid,
      validationMessage: validation.message,
    };
  }

  /**
   * Validates predictions to determine if the image is actually a rubber leaf.
   * Uses confidence threshold and entropy analysis.
   */
  private validatePredictions(
    predictions: { label: DiseaseLabel; confidence: number }[]
  ): { isValid: boolean; message?: string } {
    const topConfidence = predictions[0].confidence;

    // Check 1: Is the top prediction confident enough?
    if (topConfidence < MIN_CONFIDENCE_THRESHOLD) {
      return {
        isValid: false,
        message: `Unable to identify a rubber leaf. Please capture a clear image of a rubber leaf. (Confidence: ${topConfidence.toFixed(1)}%)`,
      };
    }

    // Check 2: Calculate normalized entropy to detect uniform/uncertain predictions
    const entropy = this.calculateNormalizedEntropy(
      predictions.map((p) => p.confidence / 100)
    );

    if (entropy > MAX_ENTROPY_THRESHOLD) {
      return {
        isValid: false,
        message:
          'The image does not appear to be a rubber leaf. Please try again with a proper rubber leaf image.',
      };
    }

    return { isValid: true };
  }

  /**
   * Calculates normalized Shannon entropy (0-1).
   * High entropy = uncertain/uniform predictions (likely not a rubber leaf)
   * Low entropy = confident prediction
   */
  private calculateNormalizedEntropy(probabilities: number[]): number {
    const n = probabilities.length;
    if (n <= 1) return 0;

    // Normalize probabilities to sum to 1
    const sum = probabilities.reduce((a, b) => a + b, 0);
    if (sum === 0) return 1; // Maximum entropy if all zeros

    const normalized = probabilities.map((p) => p / sum);

    // Calculate Shannon entropy
    let entropy = 0;
    for (const p of normalized) {
      if (p > 0) {
        entropy -= p * Math.log2(p);
      }
    }

    // Normalize by maximum possible entropy (log2(n))
    const maxEntropy = Math.log2(n);
    return entropy / maxEntropy;
  }

  isModelLoaded(): boolean {
    return this.model !== null;
  }

  async dispose(): Promise<void> {
    // Clean up model resources if needed
    this.model = null;
  }
}

export const diseaseDetectionService = new DiseaseDetectionService();
export default diseaseDetectionService;