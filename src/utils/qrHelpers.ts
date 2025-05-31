import { QRCodeData, QRCodeType, WifiQRData, VCardQRData, EmailQRData, SMSQRData } from '../types';

// Generate unique ID for QR codes
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

// Format URL content
export const formatUrlContent = (url: string): string => {
  if (!url) return '';
  try {
    const urlObj = new URL(url);
    return urlObj.toString();
  } catch {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  }
};

// Format WiFi content
export const formatWifiContent = (data: WifiQRData | string): string => {
  try {
    const { ssid, password, encryption } = typeof data === 'string' ? JSON.parse(data) : data;
    return `WIFI:T:${encryption};S:${encodeURIComponent(ssid)};P:${encodeURIComponent(password)};;`;
  } catch (error) {
    console.error('Error formatting WiFi content:', error);
    return '';
  }
};

// Format vCard content
export const formatVCardContent = (data: VCardQRData | string): string => {
  try {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
    vcard += `N:${parsedData.lastName};${parsedData.firstName};;;\n`;
    vcard += `FN:${parsedData.firstName} ${parsedData.lastName}\n`;
    
    if (parsedData.organization) {
      vcard += `ORG:${encodeURIComponent(parsedData.organization)}\n`;
    }
    
    if (parsedData.title) {
      vcard += `TITLE:${encodeURIComponent(parsedData.title)}\n`;
    }
    
    if (parsedData.phone) {
      vcard += `TEL;TYPE=CELL:${parsedData.phone}\n`;
    }
    
    if (parsedData.email) {
      vcard += `EMAIL:${parsedData.email}\n`;
    }
    
    if (parsedData.website) {
      vcard += `URL:${parsedData.website}\n`;
    }
    
    if (parsedData.address) {
      vcard += `ADR:;;${encodeURIComponent(parsedData.address)};;;;\n`;
    }
    
    vcard += 'END:VCARD';
    return vcard;
  } catch (error) {
    console.error('Error formatting vCard content:', error);
    return '';
  }
};

// Format Email content
export const formatEmailContent = (data: EmailQRData | string): string => {
  try {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    let email = `mailto:${encodeURIComponent(parsedData.address)}`;
    const params = [];
    
    if (parsedData.subject) {
      params.push(`subject=${encodeURIComponent(parsedData.subject)}`);
    }
    
    if (parsedData.body) {
      params.push(`body=${encodeURIComponent(parsedData.body)}`);
    }
    
    if (params.length > 0) {
      email += `?${params.join('&')}`;
    }
    
    return email;
  } catch (error) {
    console.error('Error formatting email content:', error);
    return '';
  }
};

// Format SMS content
export const formatSMSContent = (data: SMSQRData | string): string => {
  try {
    const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    let sms = `sms:${encodeURIComponent(parsedData.number)}`;
    
    if (parsedData.message) {
      sms += `?body=${encodeURIComponent(parsedData.message)}`;
    }
    
    return sms;
  } catch (error) {
    console.error('Error formatting SMS content:', error);
    return '';
  }
};

// Get formatted content based on QR code type
export const getFormattedContent = (type: QRCodeType, content: string): string => {
  if (!content) return '';
  
  try {
    switch (type) {
      case 'url':
        return formatUrlContent(content);
      case 'wifi':
        return formatWifiContent(content);
      case 'vcard':
        return formatVCardContent(content);
      case 'email':
        return formatEmailContent(content);
      case 'sms':
        return formatSMSContent(content);
      default:
        return content;
    }
  } catch (error) {
    console.error('Error formatting QR content:', error);
    return content;
  }
};

// Save QR code to local storage
export const saveQRCode = (qrCode: QRCodeData): void => {
  try {
    const savedQRCodes = getSavedQRCodes();
    savedQRCodes.push(qrCode);
    localStorage.setItem('qrCodes', JSON.stringify(savedQRCodes));
    
    // Dispatch storage event for cross-component communication
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error saving QR code:', error);
  }
};

// Get saved QR codes from local storage
export const getSavedQRCodes = (): QRCodeData[] => {
  try {
    const savedQRCodes = localStorage.getItem('qrCodes');
    return savedQRCodes ? JSON.parse(savedQRCodes) : [];
  } catch (error) {
    console.error('Error getting saved QR codes:', error);
    return [];
  }
};

// Delete a QR code from local storage
export const deleteQRCode = (id: string): void => {
  try {
    const savedQRCodes = getSavedQRCodes();
    const updatedQRCodes = savedQRCodes.filter(qrCode => qrCode.id !== id);
    localStorage.setItem('qrCodes', JSON.stringify(updatedQRCodes));
    
    // Dispatch storage event for cross-component communication
    window.dispatchEvent(new Event('storage'));
  } catch (error) {
    console.error('Error deleting QR code:', error);
  }
};

// Download QR code as image
export const downloadQRCode = (
  canvasRef: React.RefObject<HTMLCanvasElement>, 
  format: 'png' | 'jpeg' | 'svg', 
  filename: string
): void => {
  try {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const mimeType = format === 'jpeg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpeg' ? 0.92 : undefined;

    if (format === 'svg') {
      // Create SVG with embedded image
      const imageData = canvas.toDataURL(mimeType, quality);
      const svgData = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}" viewBox="0 0 ${canvas.width} ${canvas.height}">
  <image x="0" y="0" width="${canvas.width}" height="${canvas.height}" href="${imageData}"/>
</svg>`;

      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.svg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      // For PNG and JPEG
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error('Failed to create blob from canvas');
          }
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${filename}.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        },
        mimeType,
        quality
      );
    }
  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw new Error('Failed to download QR code');
  }
};