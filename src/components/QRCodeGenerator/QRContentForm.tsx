import React, { useState, useEffect } from 'react';
import { QRCodeType, WifiQRData, VCardQRData, EmailQRData, SMSQRData } from '../../types';

interface QRContentFormProps {
  type: QRCodeType;
  content: string;
  onContentChange: (content: string) => void;
}

const QRContentForm: React.FC<QRContentFormProps> = ({ type, content, onContentChange }) => {
  // Default state for complex types
  const [wifiData, setWifiData] = useState<WifiQRData>({
    ssid: '',
    password: '',
    encryption: 'WPA'
  });
  
  const [vcardData, setVcardData] = useState<VCardQRData>({
    firstName: '',
    lastName: '',
    organization: '',
    title: '',
    email: '',
    phone: '',
    website: '',
    address: ''
  });
  
  const [emailData, setEmailData] = useState<EmailQRData>({
    address: '',
    subject: '',
    body: ''
  });
  
  const [smsData, setSmsData] = useState<SMSQRData>({
    number: '',
    message: ''
  });

  // Initialize content when QR type changes
  useEffect(() => {
    switch (type) {
      case 'wifi':
        setWifiData({ ssid: '', password: '', encryption: 'WPA' });
        onContentChange(JSON.stringify({ ssid: '', password: '', encryption: 'WPA' }));
        break;
      case 'vcard':
        setVcardData({
          firstName: '',
          lastName: '',
          organization: '',
          title: '',
          email: '',
          phone: '',
          website: '',
          address: ''
        });
        onContentChange(JSON.stringify({
          firstName: '',
          lastName: '',
          organization: '',
          title: '',
          email: '',
          phone: '',
          website: '',
          address: ''
        }));
        break;
      case 'email':
        setEmailData({ address: '', subject: '', body: '' });
        onContentChange(JSON.stringify({ address: '', subject: '', body: '' }));
        break;
      case 'sms':
        setSmsData({ number: '', message: '' });
        onContentChange(JSON.stringify({ number: '', message: '' }));
        break;
      default:
        onContentChange('');
    }
  }, [type]);
  
  const updateWifiData = (field: keyof WifiQRData, value: string) => {
    const newData = { ...wifiData, [field]: value };
    setWifiData(newData);
    onContentChange(JSON.stringify(newData));
  };
  
  const updateVCardData = (field: keyof VCardQRData, value: string) => {
    const newData = { ...vcardData, [field]: value };
    setVcardData(newData);
    onContentChange(JSON.stringify(newData));
  };
  
  const updateEmailData = (field: keyof EmailQRData, value: string) => {
    const newData = { ...emailData, [field]: value };
    setEmailData(newData);
    onContentChange(JSON.stringify(newData));
  };
  
  const updateSmsData = (field: keyof SMSQRData, value: string) => {
    const newData = { ...smsData, [field]: value };
    setSmsData(newData);
    onContentChange(JSON.stringify(newData));
  };
  
  switch (type) {
    case 'url':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website URL
          </label>
          <input
            type="url"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="https://example.com"
            className="input"
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter a complete URL (including https:// for websites)
          </p>
        </div>
      );
      
    case 'text':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Content
          </label>
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Enter your text here..."
            className="input min-h-[120px]"
            rows={4}
          />
        </div>
      );
      
    case 'email':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={emailData.address}
              onChange={(e) => updateEmailData('address', e.target.value)}
              placeholder="example@email.com"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject (Optional)
            </label>
            <input
              type="text"
              value={emailData.subject}
              onChange={(e) => updateEmailData('subject', e.target.value)}
              placeholder="Email Subject"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Body (Optional)
            </label>
            <textarea
              value={emailData.body}
              onChange={(e) => updateEmailData('body', e.target.value)}
              placeholder="Email content..."
              className="input min-h-[80px]"
              rows={3}
            />
          </div>
        </div>
      );
      
    case 'phone':
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="+1234567890"
            className="input"
          />
          <p className="text-xs text-gray-500 mt-1">
            Include country code for international numbers
          </p>
        </div>
      );
      
    case 'sms':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              value={smsData.number}
              onChange={(e) => updateSmsData('number', e.target.value)}
              placeholder="+1234567890"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message (Optional)
            </label>
            <textarea
              value={smsData.message}
              onChange={(e) => updateSmsData('message', e.target.value)}
              placeholder="Your message here..."
              className="input min-h-[80px]"
              rows={3}
            />
          </div>
        </div>
      );
      
    case 'wifi':
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Network Name (SSID)
            </label>
            <input
              type="text"
              value={wifiData.ssid}
              onChange={(e) => updateWifiData('ssid', e.target.value)}
              placeholder="Network name"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="text"
              value={wifiData.password}
              onChange={(e) => updateWifiData('password', e.target.value)}
              placeholder="Network password"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Security Type
            </label>
            <select
              value={wifiData.encryption}
              onChange={(e) => updateWifiData('encryption', e.target.value as 'WPA' | 'WEP' | 'nopass')}
              className="select"
            >
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">No Password</option>
            </select>
          </div>
        </div>
      );
      
    case 'vcard':
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name*
              </label>
              <input
                type="text"
                value={vcardData.firstName}
                onChange={(e) => updateVCardData('firstName', e.target.value)}
                placeholder="John"
                className="input"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name*
              </label>
              <input
                type="text"
                value={vcardData.lastName}
                onChange={(e) => updateVCardData('lastName', e.target.value)}
                placeholder="Doe"
                className="input"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization
            </label>
            <input
              type="text"
              value={vcardData.organization}
              onChange={(e) => updateVCardData('organization', e.target.value)}
              placeholder="Company Name"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              value={vcardData.title}
              onChange={(e) => updateVCardData('title', e.target.value)}
              placeholder="Software Developer"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={vcardData.email}
              onChange={(e) => updateVCardData('email', e.target.value)}
              placeholder="john.doe@example.com"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              value={vcardData.phone}
              onChange={(e) => updateVCardData('phone', e.target.value)}
              placeholder="+1234567890"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <input
              type="url"
              value={vcardData.website}
              onChange={(e) => updateVCardData('website', e.target.value)}
              placeholder="https://example.com"
              className="input"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              value={vcardData.address}
              onChange={(e) => updateVCardData('address', e.target.value)}
              placeholder="123 Main St, City, Country"
              className="input min-h-[80px]"
              rows={3}
            />
          </div>
        </div>
      );
      
    default:
      return (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content
          </label>
          <input
            type="text"
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            placeholder="Enter content"
            className="input"
          />
        </div>
      );
  }
};

export default QRContentForm;