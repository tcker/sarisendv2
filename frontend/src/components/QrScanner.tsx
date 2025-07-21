'use client'
import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import { X, AlertCircle } from 'lucide-react';

interface QrScannerProps {
  onClose: () => void;
  onScan?: (text: string) => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onClose, onScan }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const qrCodeInstance = useRef<Html5Qrcode | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const stopScanner = async (): Promise<void> => {
    if (qrCodeInstance.current?.isScanning) {
      try {
        await qrCodeInstance.current.stop();
        await qrCodeInstance.current.clear();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  useEffect(() => {
    const startScanner = async (): Promise<void> => {
      if (!scannerRef.current) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        qrCodeInstance.current = new Html5Qrcode(scannerRef.current.id);

        await qrCodeInstance.current.start(
          { facingMode: 'environment' },
          { 
            fps: 10, 
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1.0
          },
          (decodedText: string) => {
            const raw = decodedText.trim();
            stopScanner();
            router.push(`/payment?scannedData=${encodeURIComponent(raw)}`);
            onClose();
            if (onScan) onScan(raw);
          },
          (errorMessage: string) => {
            console.debug('QR scan error:', errorMessage);
          }
        );
        
        setIsLoading(false);
      } catch (err) {
        console.error('QR scanner initialization error:', err);
        setIsLoading(false);
        setError('Camera access denied or not available. Please allow camera access and try again.');
      }
    };

    startScanner();
    
    return () => {
      stopScanner();
    };
  }, [onScan, router, onClose]);

  // Cleanup on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      stopScanner();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  const handleClose = async (): Promise<void> => {
    await stopScanner();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Dimmed background */}
      <div 
        className="absolute inset-0 bg-black opacity-70" 
        onClick={handleClose}
      />

      {/* Scanner feed */}
      <div
        id="qr-scanner"
        ref={scannerRef}
        className="absolute inset-0 w-full h-full z-10"
      />

      {/* Scanner frame with corner indicators */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="w-64 h-64 relative">
          {/* Main scanning frame */}
          <div className="w-full h-full border-2 border-white/30 rounded-lg relative">
            {/* Corner indicators */}
            <div className="absolute w-8 h-8 border-t-4 border-l-4 border-green-500 top-0 left-0 rounded-tl-lg" />
            <div className="absolute w-8 h-8 border-t-4 border-r-4 border-green-500 top-0 right-0 rounded-tr-lg" />
            <div className="absolute w-8 h-8 border-b-4 border-l-4 border-green-500 bottom-0 left-0 rounded-bl-lg" />
            <div className="absolute w-8 h-8 border-b-4 border-r-4 border-green-500 bottom-0 right-0 rounded-br-lg" />
          </div>
          
          {/* Scanning line animation - only show when not loading */}
          {!isLoading && !error && (
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <div className="absolute w-full h-0.5 bg-green-500 shadow-[0_0_10px_2px_rgba(34,197,94,0.8)] animate-pulse" 
                   style={{ 
                     top: '50%',
                     animation: 'scanLine 2s linear infinite'
                   }} 
              />
            </div>
          )}
          
          {/* Loading spinner */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center">
              <AlertCircle className="w-12 h-12 text-red-500" />
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-32 left-0 right-0 z-30 text-center px-4">
        {isLoading ? (
          <p className="text-white text-lg font-medium">Initializing camera...</p>
        ) : error ? (
          <div className="space-y-2">
            <p className="text-red-400 text-lg font-medium">Camera Error</p>
            <p className="text-gray-300 text-sm max-w-sm mx-auto">{error}</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-white text-lg font-medium">Scan QR Code</p>
            <p className="text-gray-300 text-sm">Position the QR code within the frame</p>
          </div>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute top-8 right-8 z-50 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
        aria-label="Close scanner"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Custom CSS for scan line animation */}
      <style jsx>{`
        @keyframes scanLine {
          0% { top: 10%; }
          50% { top: 90%; }
          100% { top: 10%; }
        }
      `}</style>
    </div>
  );
};

export default QrScanner;