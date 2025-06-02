import React from 'react';
import { AlertCircle } from 'lucide-react';

interface QRCustomizerProps {
  color: string;
  backgroundColor: string;
  size: number;
  errorCorrection: 'L' | 'M' | 'Q' | 'H';
  onColorChange: (color: string) => void;
  onBackgroundColorChange: (color: string) => void;
  onSizeChange: (size: number) => void;
  onErrorCorrectionChange: (level: 'L' | 'M' | 'Q' | 'H') => void;
}

const QRCustomizer: React.FC<QRCustomizerProps> = ({
  color,
  backgroundColor,
  size,
  errorCorrection,
  onColorChange,
  onBackgroundColorChange,
  onSizeChange,
  onErrorCorrectionChange
}) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-3">Customize QR Code</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Foreground Color
          </label>
          <div className="flex">
            <input
              type="color"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="h-10 w-10 border border-gray-300 rounded-l-lg cursor-pointer"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => onColorChange(e.target.value)}
              className="flex-1 input rounded-l-none"
              pattern="^#[0-9A-Fa-f]{6}$"
              title="Please enter a valid hex color code"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <div className="flex">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="h-10 w-10 border border-gray-300 rounded-l-lg cursor-pointer"
            />
            <input
              type="text"
              value={backgroundColor}
              onChange={(e) => onBackgroundColorChange(e.target.value)}
              className="flex-1 input rounded-l-none"
              pattern="^#[0-9A-Fa-f]{6}$"
              title="Please enter a valid hex color code"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Size: {size}px
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min="100"
            max="400"
            step="10"
            value={size}
            onChange={(e) => onSizeChange(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="number"
            value={size}
            onChange={(e) => onSizeChange(Math.min(400, Math.max(100, parseInt(e.target.value) || 100)))}
            className="w-20 input"
            min="100"
            max="400"
            step="10"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Error Correction Level
        </label>
        <select
          value={errorCorrection}
          onChange={(e) => onErrorCorrectionChange(e.target.value as 'L' | 'M' | 'Q' | 'H')}
          className="select"
        >
          <option value="L">Low (7% - Fastest)</option>
          <option value="M">Medium (15% - Balanced)</option>
          <option value="Q">Quartile (25% - Better)</option>
          <option value="H">High (30% - Best)</option>
        </select>
        
        <div className="mt-2 p-3 bg-primary-50 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-primary-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-primary-900">
            <p className="font-medium mb-1">Error Correction Tips:</p>
            <ul className="list-disc list-inside space-y-1 text-primary-700">
              <li>Low: Best for clean environments with good lighting</li>
              <li>Medium: Good balance for most use cases</li>
              <li>Quartile: Better for outdoor or variable conditions</li>
              <li>High: Best for harsh environments or when reliability is critical</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCustomizer;