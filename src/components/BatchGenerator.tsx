import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Download, Plus, Trash } from 'lucide-react';

import { QRCodeType } from '../types';
import { downloadQRCode } from '../utils/qrHelpers';

interface BatchItem {
  id: string;
  content: string;
  type: QRCodeType;
  name: string;
}

const BatchGenerator: React.FC = () => {
  const [batchItems, setBatchItems] = useState<BatchItem[]>([
    { id: '1', content: '', type: 'url', name: '' }
  ]);
  const [generatedItems, setGeneratedItems] = useState<BatchItem[]>([]);
  
  const handleAddItem = () => {
    const newId = Date.now().toString();
    setBatchItems([...batchItems, { id: newId, content: '', type: 'url', name: '' }]);
  };
  
  const handleRemoveItem = (id: string) => {
    if (batchItems.length > 1) {
      setBatchItems(batchItems.filter(item => item.id !== id));
    }
  };
  
  const handleItemChange = (id: string, field: keyof BatchItem, value: string) => {
    setBatchItems(batchItems.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };
  
  const handleGenerateBatch = () => {
    // Filter out items with empty content
    const validItems = batchItems.filter(item => item.content.trim() !== '');
    
    if (validItems.length === 0) {
      alert('Please add at least one valid QR code content');
      return;
    }
    
    setGeneratedItems(validItems);
  };
  
  const handleDownloadQR = (item: BatchItem, index: number) => {
    const canvasElement = document.getElementById(`batch-qr-${index}`) as HTMLCanvasElement;
    if (!canvasElement) return;
    
    const canvasRef = { current: canvasElement };
    const filename = item.name || `qrcode-batch-${index + 1}`;
    downloadQRCode(canvasRef, 'png', filename);
  };
  
  const handleDownloadAll = () => {
    generatedItems.forEach((item, index) => {
      setTimeout(() => {
        handleDownloadQR(item, index);
      }, index * 500); // Staggered downloads to prevent browser issues
    });
  };

  return (
    <section id="batch" className="py-8 sm:py-16 bg-gradient-to-br from-primary-50 to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Batch QR Code Generator</h2>
          <p className="text-gray-600 max-w-2xl mx-auto px-4">
            Generate multiple QR codes at once to save time.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="card p-4 sm:p-6 mb-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">Create Batch</h3>
            
            <div className="space-y-4 mb-6">
              {batchItems.map((item, index) => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start gap-2 p-3 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="w-full sm:flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Content for QR #{index + 1}
                    </label>
                    <input
                      type="text"
                      value={item.content}
                      onChange={(e) => handleItemChange(item.id, 'content', e.target.value)}
                      placeholder="URL or text content"
                      className="input"
                    />
                  </div>
                  
                  <div className="w-full sm:w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Type
                    </label>
                    <select
                      value={item.type}
                      onChange={(e) => handleItemChange(item.id, 'type', e.target.value as QRCodeType)}
                      className="select"
                    >
                      <option value="url">URL</option>
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                    </select>
                  </div>
                  
                  <div className="w-full sm:flex-1 min-w-[150px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(item.id, 'name', e.target.value)}
                      placeholder="QR name for saving"
                      className="input"
                    />
                  </div>
                  
                  <div className="w-full sm:w-auto flex justify-end sm:items-end h-[40px] mt-2 sm:mt-0">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={batchItems.length <= 1}
                      className={`p-2 rounded-lg ${
                        batchItems.length <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 hover:bg-red-50'
                      }`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddItem}
                className="btn-secondary flex items-center justify-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </button>
              
              <button
                onClick={handleGenerateBatch}
                className="btn-primary"
                disabled={batchItems.every(item => item.content.trim() === '')}
              >
                Generate Batch
              </button>
            </div>
          </div>
          
          {generatedItems.length > 0 && (
            <div className="card p-4 sm:p-6 animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <h3 className="text-lg sm:text-xl font-semibold">Generated QR Codes</h3>
                <button
                  onClick={handleDownloadAll}
                  className="btn-primary flex items-center text-sm"
                >
                  <Download className="h-4 w-4 mr-1" />
                  Download All
                </button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {generatedItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="card p-3 flex flex-col items-center">
                    <div className="bg-white p-2 rounded-md mb-2">
                      <QRCodeCanvas
                        id={`batch-qr-${index}`}
                        value={item.content}
                        size={120}
                        includeMargin
                      />
                    </div>
                    <p className="text-sm font-medium mb-2 text-center truncate w-full">
                      {item.name || `QR #${index + 1}`}
                    </p>
                    <button
                      onClick={() => handleDownloadQR(item, index)}
                      className="text-primary-600 hover:text-primary-700 text-xs flex items-center"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BatchGenerator;