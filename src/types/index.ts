export type QRCodeType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard';

export interface QRCodeData {
  id: string;
  type: QRCodeType;
  content: string;
  color: string;
  backgroundColor: string;
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  timestamp: number;
  name?: string;
}

export interface WifiQRData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
}

export interface VCardQRData {
  firstName: string;
  lastName: string;
  organization?: string;
  title?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
}

export interface EmailQRData {
  address: string;
  subject?: string;
  body?: string;
}

export interface SMSQRData {
  number: string;
  message?: string;
}