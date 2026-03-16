import React, { useState } from 'react';

const GALLERY = [
    { title: 'Daniele', url: '/assets/images/alaa_1.jpg', date: 'Oct 24, 2009' },
    { title: 'Alaa', url: '/assets/images/daniele_8.jpg', date: 'Oct 22, 2009' },
    { title: 'Everett', url: '/assets/images/everett.jpg', date: 'Oct 25, 2009' },
    { title: 'Aero Peaks', url: '/assets/images/fa_bg_glass_peaks.png', date: 'Nov 1, 2009' },
    { title: 'Aurora', url: '/assets/images/fa_bg_aurora.png', date: 'Nov 2, 2009' },
    { title: 'Oceanic', url: '/assets/images/fa_bg_oceanic.png', date: 'Nov 3, 2009' }
];

function Photos() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rotation, setRotation] = useState(0);

    const next = () => {
        setCurrentIndex((prev) => (prev + 1) % GALLERY.length);
        setRotation(0);
    };

    const prev = () => {
        setCurrentIndex((prev) => (prev - 1 + GALLERY.length) % GALLERY.length);
        setRotation(0);
    };

    const rotate = () => setRotation(r => r + 90);

    const currentPhoto = GALLERY[currentIndex];

    return (
        <div className="photos-app sys-info-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div className="photos-viewer sys-main-content" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#f5f5f5', overflow: 'hidden', padding: 20 }}>
                <div style={{ position: 'relative', maxWidth: '100%', maxHeight: '100%', borderRadius: 4, boxShadow: '0 10px 30px rgba(0,0,0,0.15)', background: 'white', padding: 10 }}>
                    <img 
                        src={currentPhoto.url} 
                        alt={currentPhoto.title}
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%', 
                            transform: `rotate(${rotation}deg)`,
                            transition: 'transform 0.3s ease'
                        }}
                    />
                </div>
            </div>

            <div className="photos-footer win7-glass" style={{ height: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 10 }}>
                <div style={{ fontSize: 13, color: '#333', fontWeight: 'bold' }}>
                    {currentPhoto.title} - {currentIndex + 1} of {GALLERY.length}
                </div>
                
                <div className="photos-controls" style={{ display: 'flex', gap: 15, alignItems: 'center' }}>
                    <button className="win7-btn-glass" onClick={prev} style={{ padding: '8px 15px', borderRadius: '50%' }}>◀</button>
                    <button className="win7-btn-glass" onClick={() => setCurrentIndex(0)} style={{ padding: '8px 20px', borderRadius: 20 }}>Slideshow</button>
                    <button className="win7-btn-glass" onClick={rotate} style={{ padding: '8px 15px', borderRadius: '50%' }}>🔄</button>
                    <button className="win7-btn-glass" onClick={next} style={{ padding: '8px 15px', borderRadius: '50%' }}>▶</button>
                </div>
                
                <div style={{ fontSize: 11, color: '#666' }}>{currentPhoto.date}</div>
            </div>
        </div>
    );
}

export default Photos;
