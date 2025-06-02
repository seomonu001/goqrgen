import React from 'react';
import { QRCodeType } from '../../types';
import { Globe, Text, Mail, Phone, MessageSquare, Wifi, Contact } from 'lucide-react';

interface QRTypeSelectorProps {
  selectedType: QRCodeType;
  onChange: (type: QRCodeType) => void;
}

const qrTypes = [
  { type: 'url' as QRCodeType, label: 'URL', icon: <Globe className="h-5 w-5" /> },
  { type: 'text' as QRCodeType, label: 'Text', icon: <Text className="h-5 w-5" /> },
  { type: 'email' as QRCodeType, label: 'Email', icon: <Mail className="h-5 w-5" /> },
  { type: 'phone' as QRCodeType, label: 'Phone', icon: <Phone className="h-5 w-5" /> },
  { type: 'sms' as QRCodeType, label: 'SMS', icon: <MessageSquare className="h-5 w-5" /> },
  { type: 'wifi' as QRCodeType, label: 'WiFi', icon: <Wifi className="h-5 w-5" /> },
  { type: 'vcard' as QRCodeType, label: 'vCard', icon: <Contact className="h-5 w-5" /> },
];

const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ selectedType, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        QR Code Type
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {qrTypes.map((type) => (
          <button
            key={type.type}
            className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all duration-200 ${
              selectedType === type.type
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-primary-200 hover:bg-gray-50'
            }`}
            onClick={() => onChange(type.type)}
          >
            <div className={`mb-1 ${selectedType === type.type ? 'text-primary-600' : 'text-gray-500'}`}>
              {type.icon}
            </div>
            <span className="text-xs font-medium">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QRTypeSelector;