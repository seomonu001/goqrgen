import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Trash2, Download, Copy, Share, Search, Filter, SortDesc, Grid, List, Clock, Calendar, Sparkles, Box, Layers } from 'lucide-react';

import { QRCodeData } from '../types';
import { getSavedQRCodes, deleteQRCode, getFormattedContent, downloadQRCode } from '../utils/qrHelpers';

const QRHistory: React.FC = () => {
  const [qrCodes, setQrCodes] = useState<QRCodeData[]>([]);
  const [selectedQR, setSelectedQR] = useState<QRCodeData | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'type'>('date');
  const [filterType, setFilterType] = useState<QRCodeType | 'all'>('all');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadQRCodes = () => {
      setIsLoading(true);
      const codes = getSavedQRCodes();
      setQrCodes(codes.sort((a, b) => b.timestamp - a.timestamp));
      setIsLoading(false);
    };
    
    loadQRCodes();
    window.addEventListener('storage', loadQRCodes);
    return () => window.removeEventListener('storage', loadQRCodes);
  }, []);

  const filteredAndSortedQRCodes = qrCodes
    .filter(qr => {
      const matchesSearch = qr.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        qr.content.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || qr.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return b.timestamp - a.timestamp;
      }
    });

  const handleDeleteQR = async (id: string) => {
    if (confirm('Are you sure you want to delete this QR code?')) {
      deleteQRCode(id);
      setQrCodes(qrCodes.filter(qr => qr.id !== id));
      if (selectedQR && selectedQR.id === id) {
        setSelectedQR(null);
      }
    }
  };
  
  const handleShare = async (qr: QRCodeData) => {
    const canvasElement = document.getElementById(`qr-canvas-${qr.id}`) as HTMLCanvasElement;
    if (!canvasElement) return;
    
    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasElement.toBlob((b) => {
          if (b) resolve(b);
        }, 'image/png');
      });
      
      const file = new File([blob], `${qr.name || 'qrcode'}.png`, { type: 'image/png' });
      
      if (navigator.share) {
        await navigator.share({
          title: qr.name || 'QR Code',
          text: 'Check out this QR code!',
          files: [file]
        });
      } else {
        alert('Sharing is not supported on this device/browser.');
      }
    } catch (err) {
      console.error('Error sharing QR code:', err);
    }
  };

  const handleDownloadQR = (qr: QRCodeData) => {
    const canvasElement = document.getElementById(`qr-canvas-${qr.id}`) as HTMLCanvasElement;
    if (!canvasElement) return;
    const canvasRef = { current: canvasElement };
    downloadQRCode(canvasRef, 'png', qr.name || `qrcode-${qr.id}`);
  };
  
  const handleCopyQR = async (qr: QRCodeData) => {
    const canvasElement = document.getElementById(`qr-canvas-${qr.id}`) as HTMLCanvasElement;
    if (!canvasElement) return;
    
    try {
      const blob = await new Promise<Blob>((resolve) => {
        canvasElement.toBlob((b) => {
          if (b) resolve(b);
        }, 'image/png');
      });
      
      const item = new ClipboardItem({ 'image/png': blob });
      await navigator.clipboard.write([item]);
      alert('QR code copied to clipboard!');
    } catch (err) {
      console.error('Error copying QR code:', err);
    }
  };

  return (
    <section id="history" className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block">
            <span className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-2xl">
              <Layers className="w-8 h-8 text-primary-600" />
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-gray-900">QR Code History</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your QR code journey, beautifully organized and easily accessible
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-200 border-t-transparent"></div>
          </div>
        ) : qrCodes.length === 0 ? (
          <div className="bg-gray-50 rounded-3xl p-12 text-center border border-gray-200">
            <div className="mb-6">
              <Box className="w-16 h-16 mx-auto text-primary-600" />
            </div>
            <h3 className="text-2xl font-medium mb-4 text-gray-900">Start Your QR Collection</h3>
            <p className="text-gray-600 mb-8">
              Create your first QR code and watch your collection grow here
            </p>
            <a 
              href="#generator" 
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-full font-medium transition-all duration-300 hover:bg-primary-700 hover:scale-105"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Create Your First QR Code
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search QR codes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as QRCodeType | 'all')}
                      className="bg-white border border-gray-300 rounded-xl text-gray-700 py-2 px-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="all">All Types</option>
                      <option value="url">URLs</option>
                      <option value="text">Text</option>
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="sms">SMS</option>
                      <option value="wifi">WiFi</option>
                      <option value="vcard">vCard</option>
                    </select>
                    
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'date' | 'name' | 'type')}
                      className="bg-white border border-gray-300 rounded-xl text-gray-700 py-2 px-4 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="date">Latest First</option>
                      <option value="name">By Name</option>
                      <option value="type">By Type</option>
                    </select>
                    
                    <div className="flex bg-white rounded-xl p-1 border border-gray-300">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === 'grid' 
                            ? 'bg-primary-50 text-primary-600' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <Grid className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-all duration-200 ${
                          viewMode === 'list' 
                            ? 'bg-primary-50 text-primary-600' 
                            : 'text-gray-400 hover:text-gray-600'
                        }`}
                      >
                        <List className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {filteredAndSortedQRCodes.map((qr) => (
                      <div
                        key={qr.id}
                        className={`bg-white rounded-xl border transition-all duration-200 hover:shadow-lg cursor-pointer ${
                          selectedQR?.id === qr.id ? 'ring-2 ring-primary-500' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedQR(qr)}
                      >
                        <div className="p-4">
                          <div className="bg-gray-50 p-3 rounded-lg mb-3 flex justify-center">
                            <QRCodeCanvas
                              id={`qr-canvas-${qr.id}`}
                              value={getFormattedContent(qr.type, qr.content)}
                              size={120}
                              bgColor={qr.backgroundColor}
                              fgColor={qr.color}
                              level={qr.errorCorrection}
                              includeMargin
                            />
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-gray-900 mb-1 truncate">
                              {qr.name || 'Unnamed QR Code'}
                            </p>
                            <p className="text-xs text-gray-500 mb-2">
                              {new Date(qr.timestamp).toLocaleDateString()}
                            </p>
                            <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-50 text-primary-700 rounded-full">
                              {qr.type.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="divide-y divide-gray-200">
                    {filteredAndSortedQRCodes.map((qr) => (
                      <div
                        key={qr.id}
                        className={`py-4 flex items-center gap-4 cursor-pointer transition-all duration-200 ${
                          selectedQR?.id === qr.id ? 'bg-primary-50' : 'hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedQR(qr)}
                      >
                        <div className="bg-white p-2 rounded-lg border border-gray-200">
                          <QRCodeCanvas
                            id={`qr-canvas-${qr.id}`}
                            value={getFormattedContent(qr.type, qr.content)}
                            size={60}
                            bgColor={qr.backgroundColor}
                            fgColor={qr.color}
                            level={qr.errorCorrection}
                            includeMargin
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {qr.name || 'Unnamed QR Code'}
                          </p>
                          <p className="text-sm text-gray-500">
                            Created {new Date(qr.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                        <span className="px-3 py-1 text-sm font-medium bg-primary-50 text-primary-700 rounded-full">
                          {qr.type.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              {selectedQR ? (
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
                  <h3 className="text-xl font-semibold mb-6 text-gray-900">QR Code Details</h3>
                  
                  <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex justify-center">
                    <QRCodeCanvas
                      value={getFormattedContent(selectedQR.type, selectedQR.content)}
                      size={200}
                      bgColor={selectedQR.backgroundColor}
                      fgColor={selectedQR.color}
                      level={selectedQR.errorCorrection}
                      includeMargin
                    />
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Name</p>
                      <p className="text-gray-900">{selectedQR.name || 'Unnamed QR Code'}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Type</p>
                      <p className="text-gray-900 capitalize">{selectedQR.type}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Created</p>
                      <p className="text-gray-900">{new Date(selectedQR.timestamp).toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-gray-500">Content</p>
                      <p className="text-gray-900 break-words">
                        {selectedQR.type === 'vcard' || selectedQR.type === 'wifi' ? 
                          'Complex data (contact/wifi)' : selectedQR.content}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleDownloadQR(selectedQR)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 rounded-xl transition-all duration-200 text-primary-700"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>
                    
                    <button
                      onClick={() => handleShare(selectedQR)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 rounded-xl transition-all duration-200 text-primary-700"
                      disabled={!navigator.share}
                    >
                      <Share className="h-4 w-4" />
                      Share
                    </button>
                    
                    <button
                      onClick={() => handleCopyQR(selectedQR)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-primary-50 hover:bg-primary-100 rounded-xl transition-all duration-200 text-primary-700"
                    >
                      <Copy className="h-4 w-4" />
                      Copy
                    </button>
                    
                    <button
                      onClick={() => handleDeleteQR(selectedQR.id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200 text-center">
                  <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a QR Code
                  </h3>
                  <p className="text-gray-500">
                    Click on any QR code to view its details and available actions
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default QRHistory;