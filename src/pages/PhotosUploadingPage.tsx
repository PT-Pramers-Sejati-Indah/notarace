import { Link } from 'react-router-dom';
import { Camera } from 'lucide-react';

export const PhotosUploadingPage = () => {
  return (
    <main className="photos-wait" aria-live="polite">
      <div className="photos-wait__glow" aria-hidden />
      <div className="photos-wait__inner">
        <div className="photos-wait__icon" aria-hidden>
          <Camera size={40} strokeWidth={1.75} />
        </div>
        <h1 className="photos-wait__title">Foto sedang diupload</h1>
        <p className="photos-wait__sub">Mohon tunggu</p>
        <Link to="/" className="photos-wait__back">
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
};
