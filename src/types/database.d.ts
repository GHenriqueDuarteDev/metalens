export interface ExifDataPayload {
  ifd0?: {
    Make?: string;
    Model?: string;
    Software?: string;
    Orientation?: string;
    [key: string]: unknown;
  };
  exif?: {
    ISO?: number;
    FNumber?: number;
    ExposureTime?: number;
    FocalLength?: number;
    DateTimeOriginal?: string;
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
