import React, { useState, useEffect, useMemo } from 'react';
import { Search, Download, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface PhotoData {
  image_url: string;
  high_image_url: string;
  bip: number[];
}

export const ImageViewerPage = () => {
  const [allPhotos, setAllPhotos] = useState<PhotoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoData | null>(null);
  const photosPerPage = 20;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setAllPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  const filteredPhotos = useMemo(() => {
    if (!searchTerm.trim()) return allPhotos;
    const term = searchTerm.trim();
    return allPhotos.filter(photo => 
      photo.bip.some(bip => bip.toString().includes(term))
    );
  }, [allPhotos, searchTerm]);

  const totalPages = Math.ceil(filteredPhotos.length / photosPerPage);
  
  const currentPhotos = useMemo(() => {
    const startIndex = (currentPage - 1) * photosPerPage;
    return filteredPhotos.slice(startIndex, startIndex + photosPerPage);
  }, [filteredPhotos, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback if fetch/blob fails
      window.open(url, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="page-wrapper container flex items-center justify-center">
        <div className="text-center">
          <div className="text-accent mb-4" style={{ animation: 'spin 1s linear infinite' }}>
            <ImageIcon size={48} />
          </div>
          <p className="text-xl font-bold">Memuat Foto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper animate-fade-in">
      <div className="container gallery-container">
        <header className="gallery-header">
          <div className="gallery-title-area">
            <h1 className="text-5xl font-extrabold mb-4">
              Galeri Foto <span className="text-accent">Race</span>
            </h1>
            <p className="text-lg text-muted max-width-md">
              Temukan momen terbaik Anda. Masukkan nomor BIB Anda untuk mencari foto spesifik.
            </p>
          </div>
          
          <div className="search-wrapper">
            <Search className="search-icon" size={24} />
            <input 
              type="text" 
              placeholder="Cari nomor BIB (Contoh: 2025)..." 
              className="form-input search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </header>

        {filteredPhotos.length > 0 ? (
          <>
            <div className="gallery-grid">
              {currentPhotos.map((photo, index) => (
                <div 
                  key={index} 
                  className="photo-card" 
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img src={photo.image_url} alt={`Race photo ${photo.bip.join(', ')}`} loading="lazy" />
                  <div className="photo-overlay">
                    <div className="bip-tags">
                      {photo.bip.slice(0, 3).map((b, i) => (
                        <span key={i} className="bip-tag">BIP {b}</span>
                      ))}
                      {photo.bip.length > 3 && <span className="bip-tag">+{photo.bip.length - 3}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-item" 
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                >
                  <ChevronLeft size={20} />
                </button>
                
                <div className="flex gap-2">
                  {[...Array(Math.min(5, totalPages))].map((_, i) => {
                    let pageNum = currentPage;
                    if (currentPage <= 3) pageNum = i + 1;
                    else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
                    else pageNum = currentPage - 2 + i;
                    
                    if (pageNum <= 0 || pageNum > totalPages) return null;

                    return (
                      <button 
                        key={pageNum}
                        className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
                        onClick={() => setCurrentPage(pageNum)}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button 
                  className="page-item" 
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="mb-6 text-muted opacity-20">
              <ImageIcon size={80} />
            </div>
            <h3 className="text-3xl font-bold mb-4">Foto Tidak Ditemukan</h3>
            <p className="text-lg text-muted mb-8">
              Maaf, kami tidak menemukan foto dengan nomor BIB "{searchTerm}".<br/>
              Coba nomor lain atau lihat semua foto.
            </p>
            <button className="btn btn-primary" onClick={() => setSearchTerm('')}>
              Lihat Semua Foto
            </button>
          </div>
        )}
      </div>

      {selectedPhoto && (
        <div className="modal-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPhoto(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-image-wrapper">
              <img src={selectedPhoto.high_image_url} className="modal-image" alt="Preview" />
            </div>

            <div className="modal-actions">
              <div className="flex gap-3">
                {selectedPhoto.bip.map((b, i) => (
                  <span key={i} className="bip-tag">BIB {b}</span>
                ))}
              </div>
              <button 
                className="btn btn-primary btn-lg"
                onClick={() => handleDownload(selectedPhoto.high_image_url, `notarace-photo-${selectedPhoto.bip[0] || 'img'}.jpg`)}
              >
                <Download size={20} />
                Download High Quality
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
