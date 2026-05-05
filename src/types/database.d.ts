export interface ExifDataPayload {
  ifd0?: {
    Make?: string;
    Model?: string;
    Software?: string;
    Orientation?: string;
    ModifyDate?: string;
    ImageWidth?: string;
    ImageHeight?: string;
    [key: string]: unknown;
  };
  exif?: {
    ISO?: number;
    FNumber?: number;
    ExposureTime?: number;
    ExposureCompensation?: number;
    FocalLength?: number;
    FocalLengthIn35mmFormat?: number;
    MaxApertureValue?: number;
    Flash?: string;
    WhiteBalance?: string;
    BrightnessValue?: number;
    ExposureMode?: string;
    ExposureProgram?: string;
    MeteringMode?: string;
    SceneCaptureType?: string;
    DateTimeOriginal?: string;
    ExifImageWidth?: number;
    ExifImageHeight?: number;
    [key: string]: unknown;
  };
  gps?: {
    latitude?: number;
    longitude?: number;
    GPSAltitude?: number;
    [key: string]: unknown;
  };
  xmp?: Record<string, unknown>;
  iptc?: Record<string, unknown>;
  icc?: Record<string, unknown>;
  makerNote?: Record<string, unknown>;
}
