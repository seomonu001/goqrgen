import React, { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import jsQR from 'jsqr';
import { Camera, XCircle, Copy, ExternalLink, RefreshCw, SwitchCamera, ZoomIn, ZoomOut, Flashlight, Scan, History, Share, Sparkles, Shield } from 'lucide-react';

const QRScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [zoom, setZoom] = useState(1);
  const [hasMultipleCameras, setHasMultipleCameras] = useState(false);
  const [torchAvailable, setTorchAvailable] = useState(false);
  const [torchActive, setTorchActive] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [scanHistory, setScanHistory] = useState<{ content: string; timestamp: number }[]>([]);
  const [canShare, setCanShare] = useState(false);
  
  const webcamRef = useRef<Webcam>(null);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if sharing is supported
    setCanShare('share' in navigator);

    // Check available cameras
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setHasMultipleCameras(videoDevices.length > 1);
      })
      .catch(err => {
        console.error('Error checking cameras:', err);
      });
  }, []);

  useEffect(() => {
    if (scanning) {
      const track = webcamRef.current?.video?.srcObject instanceof MediaStream 
        ? webcamRef.current.video.srcObject.getVideoTracks()[0]
        : null;

      if (track?.getCapabilities?.()?.torch) {
        setTorchAvailable(true);
      }
    }
  }, [scanning]);

  useEffect(() => {
    if (scanning) {
      setScannerActive(true);
      const interval = setInterval(() => {
        setScannerActive(prev => !prev);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [scanning]);

  const toggleTorch = async () => {
    try {
      const track = webcamRef.current?.video?.srcObject instanceof MediaStream 
        ? webcamRef.current.video.srcObject.getVideoTracks()[0]
        : null;

      if (track && track.getCapabilities().torch) {
        await track.applyConstraints({
          advanced: [{ torch: !torchActive }]
        });
        setTorchActive(!torchActive);
      }
    } catch (err) {
      console.error('Error toggling torch:', err);
    }
  };

  const switchCamera = () => {
    setFacingMode(prev => prev === 'environment' ? 'user' : 'environment');
  };

  const handleZoom = (direction: 'in' | 'out') => {
    const newZoom = direction === 'in' ? zoom + 0.1 : zoom - 0.1;
    setZoom(Math.max(1, Math.min(2, newZoom)));
  };
  
  const startScanning = async () => {
    try {
      setScanning(true);
      setScanned(false);
      setResult('');
      setError('');
      
      intervalRef.current = window.setInterval(() => {
        if (webcamRef.current) {
          const video = webcamRef.current.video;
          
          if (video && video.readyState === 4) {
            const canvas = document.createElement('canvas');
            const canvasContext = canvas.getContext('2d');
            
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            
            if (canvasContext) {
              canvasContext.drawImage(video, 0, 0, canvas.width, canvas.height);
              
              const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height, {
                inversionAttempts: 'dontInvert',
              });
              
              if (code) {
                setResult(code.data);
                setScanned(true);
                setScanning(false);
                setScanHistory(prev => [{
                  content: code.data,
                  timestamp: Date.now()
                }, ...prev].slice(0, 10));
                
                if (intervalRef.current) {
                  clearInterval(intervalRef.current);
                  intervalRef.current = null;
                }
              }
            }
          }
        }
      }, 500);
    } catch (err) {
      console.error('Error starting QR scanner:', err);
      setError('Error loading QR scanner. Please try again.');
      setScanning(false);
    }
  };
  
  const stopScanning = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setScanning(false);
    setTorchActive(false);
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert('Content copied to clipboard!');
    } catch (err) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = result;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        alert('Content copied to clipboard!');
      } catch (err) {
        console.error('Fallback copy failed:', err);
        alert('Failed to copy content. Please try selecting and copying manually.');
      }
      document.body.removeChild(textArea);
    }
  };
  
  const shareResult = async () => {
    try {
      await navigator.share({
        title: 'Scanned QR Code',
        text: result
      });
    } catch (err) {
      console.error('Error sharing result:', err);
      alert('Failed to share. You can copy the content instead.');
    }
  };
  
  const isValidURL = (str: string) => {
    try {
      new URL(str);
      return true;
    } catch (err) {
      return false;
    }
  };

  const retryScanning = () => {
    setScanned(false);
    setResult('');
    startScanning();
  };
  
  return (
    <section id="scanner" className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-primary-900 text-white">
      <div className="container-custom relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary-500 opacity-10 rounded-full blur-3xl"></div>
        </div>

        <div className="text-center mb-12 relative">
          <div className="inline-block">
            <span className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
              <Scan className="w-8 h-8 text-primary-300" />
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-4 text-white">Smart QR Scanner</h2>
          <p className="text-primary-200 max-w-2xl mx-auto">
            Advanced scanning with real-time detection and instant results
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl border border-white border-opacity-20 shadow-2xl overflow-hidden">
              {!scanning && !scanned ? (
                <div className="text-center py-16">
                  <div className="relative w-32 h-32 mx-auto mb-8">
                    <div className="absolute inset-0 bg-primary-500 opacity-30 rounded-3xl animate-pulse"></div>
                    <Camera className="absolute inset-0 m-auto h-16 w-16 text-primary-200" />
                  </div>
                  <h3 className="text-2xl font-medium mb-4 text-white">Ready to Scan</h3>
                  <p className="text-primary-200 mb-8 max-w-md mx-auto">
                    Our advanced scanner uses AI-powered detection for instant results
                  </p>
                  <button
                    onClick={startScanning}
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg group text-white"
                  >
                    <Sparkles className="w-5 h-5 mr-2 transition-transform group-hover:rotate-12" />
                    Start Scanning
                  </button>
                </div>
              ) : scanning ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden bg-black">
                    <div className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none ${
                      scannerActive ? 'animate-pulse' : ''
                    }`}>
                      <div className="relative w-64 h-64">
                        <div className="absolute inset-0 border-2 border-primary-500 rounded-lg opacity-70"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-primary-500 animate-[scanner_2s_linear_infinite]"></div>
                        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary-500"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-primary-500"></div>
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-primary-500"></div>
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary-500"></div>
                      </div>
                    </div>
                    
                    <Webcam
                      ref={webcamRef}
                      audio={false}
                      screenshotFormat="image/jpeg"
                      videoConstraints={{
                        facingMode,
                        zoom
                      }}
                      className="w-full rounded-xl"
                      style={{ transform: `scale(${zoom})` }}
                    />
                    
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black bg-opacity-50 backdrop-blur-sm rounded-full p-2">
                      {hasMultipleCameras && (
                        <button
                          onClick={switchCamera}
                          className="p-2 text-white hover:text-primary-400 transition-colors rounded-full hover:bg-white hover:bg-opacity-10"
                          title="Switch Camera"
                        >
                          <SwitchCamera className="h-6 w-6" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleZoom('out')}
                        className={`p-2 transition-colors rounded-full hover:bg-white hover:bg-opacity-10 ${
                          zoom <= 1 ? 'text-gray-400 cursor-not-allowed' : 'text-white hover:text-primary-400'
                        }`}
                        disabled={zoom <= 1}
                        title="Zoom Out"
                      >
                        <ZoomOut className="h-6 w-6" />
                      </button>
                      
                      <button
                        onClick={() => handleZoom('in')}
                        className={`p-2 transition-colors rounded-full hover:bg-white hover:bg-opacity-10 ${
                          zoom >= 2 ? 'text-gray-400 cursor-not-allowed' : 'text-white hover:text-primary-400'
                        }`}
                        disabled={zoom >= 2}
                        title="Zoom In"
                      >
                        <ZoomIn className="h-6 w-6" />
                      </button>
                      
                      {torchAvailable && (
                        <button
                          onClick={toggleTorch}
                          className={`p-2 transition-colors rounded-full hover:bg-white hover:bg-opacity-10 ${
                            torchActive ? 'text-yellow-400' : 'text-white'
                          } hover:text-primary-400`}
                          title="Toggle Flash"
                        >
                          <Flashlight className="h-6 w-6" />
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-center">
                    <button
                      onClick={stopScanning}
                      className="btn-secondary flex items-center gap-2 transform hover:scale-105 transition-transform duration-200"
                    >
                      <XCircle className="h-5 w-5" />
                      Stop Scanning
                    </button>
                  </div>
                </div>
              ) : scanned ? (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Scan className="h-6 w-6 text-green-600" />
                      </div>
                      <h3 className="text-lg font-medium text-green-800">
                        QR Code Scanned Successfully!
                      </h3>
                    </div>
                    
                    <div className="bg-white p-4 rounded-lg border border-green-200 mb-4">
                      <pre className="whitespace-pre-wrap break-words text-sm text-gray-700">
                        {result}
                      </pre>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 justify-center">
                      <button
                        onClick={copyToClipboard}
                        className="btn-primary flex items-center gap-2"
                      >
                        <Copy className="h-4 w-4" />
                        Copy Content
                      </button>
                      
                      {isValidURL(result) && (
                        <a
                          href={result}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-accent flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open URL
                        </a>
                      )}
                      
                      {canShare && (
                        <button
                          onClick={shareResult}
                          className="btn-secondary flex items-center gap-2"
                        >
                          <Share className="h-4 w-4" />
                          Share Result
                        </button>
                      )}
                      
                      <button
                        onClick={retryScanning}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <RefreshCw className="h-4 w-4" />
                        Scan Another
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
              
              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 animate-fade-in">
                  <p className="flex items-center gap-2">
                    <XCircle className="h-5 w-5" />
                    {error}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl border border-white border-opacity-20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-primary-300" />
                <h3 className="text-xl font-medium text-white">Smart Features</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-primary-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 bg-opacity-30 rounded-full flex items-center justify-center">
                    <ZoomIn className="w-4 h-4 text-primary-200" />
                  </div>
                  <span>Advanced zoom controls</span>
                </li>
                <li className="flex items-center gap-3 text-primary-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 bg-opacity-30 rounded-full flex items-center justify-center">
                    <Flashlight className="w-4 h-4 text-primary-200" />
                  </div>
                  <span>Flash control for low light</span>
                </li>
                <li className="flex items-center gap-3 text-primary-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 bg-opacity-30 rounded-full flex items-center justify-center">
                    <History className="w-4 h-4 text-primary-200" />
                  </div>
                  <span>Scan history tracking</span>
                </li>
                <li className="flex items-center gap-3 text-primary-200">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 bg-opacity-30 rounded-full flex items-center justify-center">
                    <Share className="w-4 h-4 text-primary-200" />
                  </div>
                  <span>Quick sharing options</span>
                </li>
              </ul>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-xl rounded-3xl border border-white border-opacity-20 p-6">
              <div className="flex items-center gap-3 mb-6">
                <History className="w-6 h-6 text-primary-300" />
                <h3 className="text-xl font-medium text-white">Recent Scans</h3>
              </div>
              
              {scanHistory.length === 0 ? (
                <div className="text-center py-8 bg-white bg-opacity-5 rounded-xl border border-white border-opacity-10">
                  <p className="text-white text-opacity-60">No scans yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {scanHistory.map((scan, index) => (
                    <div
                      key={index}
                      className="p-3 bg-white bg-opacity-5 rounded-xl border border-white border-opacity-10 hover:bg-opacity-10 transition-colors"
                    >
                      <p className="text-sm font-medium text-white text-opacity-90 mb-1 break-words">
                        {scan.content}
                      </p>
                      <p className="text-xs text-white text-opacity-60">
                        {new Date(scan.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRScanner;