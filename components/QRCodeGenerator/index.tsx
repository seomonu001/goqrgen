import React, { useState, useRef, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Copy, Save, Image, Palette, RotateCcw, Share, Sparkles, Shield } from 'lucide-react';

import QRTypeSelector from './QRTypeSelector';
import QRCustomizer from './QRCustomizer';
import QRContentForm from './QRContentForm';

import { QRCodeData, QRCodeType } from '../../types';
import { generateId, saveQRCode, getFormattedContent } from '../../utils/qrHelpers';

const QRCodeGenerator: React.FC = () => {
  const [qrType, setQrType] = useState<QRCodeType>('url');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [color, setColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [size, setSize] = useState(200);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<'png' | 'jpeg' | 'svg'>('png');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [logoUrl, setLogoUrl] = useState('');
  const [logoSize, setLogoSize] = useState(30);
  const [undoStack, setUndoStack] = useState<QRCodeData[]>([]);
  const [redoStack, setRedoStack] = useState<QRCodeData[]>([]);
  
  const qrRef = useRef<HTMLCanvasElement>(null);
  
  const formattedContent = getFormattedContent(qrType, content);

  useEffect(() => {
    setPreviewKey(prev => prev + 1);
  }, [formattedContent, color, backgroundColor, size, errorCorrection, logoUrl, logoSize]);

  const saveToHistory = (data: QRCodeData) => {
    setUndoStack(prev => [...prev, data]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const prevState = undoStack[undoStack.length - 1];
      setRedoStack(prev => [...prev, {
        id: generateId(),
        type: qrType,
        content,
        color,
        backgroundColor,
        size,
        errorCorrection,
        timestamp: Date.now(),
        name
      }]);
      
      setQrType(prevState.type);
      setContent(prevState.content);
      setColor(prevState.color);
      setBackgroundColor(prevState.backgroundColor);
      setSize(prevState.size);
      setErrorCorrection(prevState.errorCorrection);
      setName(prevState.name || '');
      
      setUndoStack(prev => prev.slice(0, -1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      const nextState = redoStack[redoStack.length - 1];
      setUndoStack(prev => [...prev, {
        id: generateId(),
        type: qrType,
        content,
        color,
        backgroundColor,
        size,
        errorCorrection,
        timestamp: Date.now(),
        name
      }]);
      
      setQrType(nextState.type);
      setContent(nextState.content);
      setColor(nextState.color);
      setBackgroundColor(nextState.backgroundColor);
      setSize(nextState.size);
      setErrorCorrection(nextState.errorCorrection);
      setName(nextState.name || '');
      
      setRedoStack(prev => prev.slice(0, -1));
    }
  };
  
  const handleGenerateQR = () => {
    if (!content) return;
    setShowCustomizer(true);
    saveToHistory({
      id: generateId(),
      type: qrType,
      content,
      color,
      backgroundColor,
      size,
      errorCorrection,
      timestamp: Date.now(),
      name
    });
  };
  
  const handleSaveQR = () => {
    if (!content) return;
    
    const qrData: QRCodeData = {
      id: generateId(),
      type: qrType,
      content,
      color,
      backgroundColor,
      size,
      errorCorrection,
      timestamp: Date.now(),
      name: name || `QR Code ${new Date().toLocaleString()}`
    };
    
    saveQRCode(qrData);
    setSaveSuccess(true);
    
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };
  
  const handleDownloadQR = () => {
    if (!qrRef.current || !content) return;
    
    const canvas = qrRef.current;
    const filename = name || `qrcode-${Date.now()}`;

    if (downloadFormat === 'svg') {
      // Get the QR code as a PNG data URL
      const pngData = canvas.toDataURL('image/png');
      
      // Create SVG with embedded image
      const svgData = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <image x="0" y="0" width="${size}" height="${size}" href="${pngData}"/>
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
      const link = document.createElement('a');
      link.download = `${filename}.${downloadFormat}`;
      link.href = canvas.toDataURL(`image/${downloadFormat}`, downloadFormat === 'jpeg' ? 0.92 : undefined);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  
  const handleCopyQR = async () => {
    if (!qrRef.current || !content) return;
    
    try {
      const canvas = qrRef.current;
      canvas.toBlob(async (blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          alert('QR code copied to clipboard!');
        }
      }, 'image/png');
    } catch (err) {
      console.error('Error copying QR code:', err);
      alert('Failed to copy QR code. Please try again.');
    }
  };

  const handleShare = async () => {
    if (!qrRef.current || !content) return;
    
    try {
      const canvas = qrRef.current;
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => {
          if (b) resolve(b);
        }, 'image/png');
      });
      
      const file = new File([blob], 'qrcode.png', { type: 'image/png' });
      
      if (navigator.share) {
        await navigator.share({
          title: name || 'QR Code',
          text: 'Check out this QR code!',
          files: [file]
        });
      } else {
        alert('Sharing is not supported on this device/browser.');
      }
    } catch (err) {
      console.error('Error sharing QR code:', err);
      if (err instanceof Error && err.name !== 'AbortError') {
        alert('Failed to share QR code. Please try again.');
      }
    }
  };

  const handleAddLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="generator" className="py-8 sm:py-16 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">QR Code Generator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Create your custom QR code by selecting a type and entering your content.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <div className="card p-4 sm:p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg sm:text-xl font-semibold">Create Your QR Code</h3>
              <div className="flex gap-2">
                <button
                  onClick={handleUndo}
                  disabled={undoStack.length === 0}
                  className={`p-2 rounded-lg ${
                    undoStack.length === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Undo"
                >
                  <RotateCcw className="h-5 w-5" />
                </button>
                <button
                  onClick={handleRedo}
                  disabled={redoStack.length === 0}
                  className={`p-2 rounded-lg ${
                    redoStack.length === 0 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  title="Redo"
                >
                  <RotateCcw className="h-5 w-5 transform scale-x-[-1]" />
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <QRTypeSelector 
                selectedType={qrType} 
                onChange={setQrType} 
              />
            </div>
            
            <div className="mb-6">
              <QRContentForm
                type={qrType}
                content={content}
                onContentChange={setContent}
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                QR Code Name (Optional)
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="My QR Code"
                className="input"
              />
            </div>
            
            <button
              onClick={handleGenerateQR}
              disabled={!content}
              className={`btn-primary w-full ${!content ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Generate QR Code
            </button>
          </div>
          
          <div className="card p-4 sm:p-6 animate-fade-in">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Preview & Download</h3>
            
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="p-4 bg-white rounded-lg shadow-sm mb-4 border border-gray-200">
                <QRCodeCanvas
                  key={previewKey}
                  ref={qrRef}
                  value={formattedContent || ' '}
                  size={size}
                  bgColor={backgroundColor}
                  fgColor={color}
                  level={errorCorrection}
                  includeMargin
                  imageSettings={logoUrl ? {
                    src: logoUrl,
                    height: logoSize,
                    width: logoSize,
                    excavate: true
                  } : undefined}
                />
              </div>
              
              {content ? (
                <p className="text-sm text-gray-500">QR code is ready!</p>
              ) : (
                <p className="text-sm text-gray-500">Enter content to generate a QR code</p>
              )}
            </div>
            
            {showCustomizer && (
              <div className="mb-6 animate-slide-up">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                  <h4 className="text-lg font-medium">Style Options</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => document.getElementById('logo-input')?.click()}
                      className="btn-secondary flex items-center gap-2 text-sm"
                      title="Add Logo"
                    >
                      <Image className="h-4 w-4" />
                      Add Logo
                    </button>
                    <input
                      id="logo-input"
                      type="file"
                      accept="image/*"
                      onChange={handleAddLogo}
                      className="hidden"
                    />
                    <button
                      onClick={() => {
                        setColor('#000000');
                        setBackgroundColor('#ffffff');
                        setLogoUrl('');
                        setLogoSize(30);
                      }}
                      className="btn-secondary flex items-center gap-2 text-sm"
                      title="Reset Style"
                    >
                      <RotateCcw className="h-4 w-4" />
                      Reset
                    </button>
                  </div>
                </div>
                
                <QRCustomizer
                  color={color}
                  backgroundColor={backgroundColor}
                  size={size}
                  errorCorrection={errorCorrection}
                  onColorChange={setColor}
                  onBackgroundColorChange={setBackgroundColor}
                  onSizeChange={setSize}
                  onErrorCorrectionChange={setErrorCorrection}
                />
                
                {logoUrl && (
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo Size: {logoSize}px
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={logoSize}
                        onChange={(e) => setLogoSize(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <button
                        onClick={() => setLogoUrl('')}
                        className="btn-secondary text-sm"
                      >
                        Remove Logo
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <select
                  value={downloadFormat}
                  onChange={(e) => setDownloadFormat(e.target.value as 'png' | 'jpeg' | 'svg')}
                  className="select"
                >
                  <option value="png">PNG Format (Best Quality)</option>
                  <option value="jpeg">JPEG Format (Smaller Size)</option>
                  <option value="svg">SVG Format (Scalable)</option>
                </select>
              </div>
              <button
                onClick={handleDownloadQR}
                disabled={!content}
                className={`btn-primary flex items-center justify-center ${!content ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Download className="mr-1 h-4 w-4" />
                Download
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <button
                onClick={handleCopyQR}
                disabled={!content}
                className={`btn-secondary flex items-center justify-center ${!content ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Copy className="mr-1 h-4 w-4" />
                Copy
              </button>
              <button
                onClick={handleSaveQR}
                disabled={!content}
                className={`btn-accent flex items-center justify-center ${!content ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <Save className="mr-1 h-4 w-4" />
                Save
              </button>
              <button
                onClick={handleShare}
                disabled={!content || !navigator.share}
                className={`btn-primary flex items-center justify-center ${
                  !content || !navigator.share ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <Share className="mr-1 h-4 w-4" />
                Share
              </button>
            </div>
            
            {saveSuccess && (
              <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-lg text-center animate-fade-in">
                QR code saved successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodeGenerator;