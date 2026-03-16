import React, { useState, useEffect, useRef } from 'react';

function VolumeControl({ osVolume, setOsVolume, playSound }) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleVolumeChange = (e) => {
        const value = parseFloat(e.target.value);
        setOsVolume(value);
    };

    const getVolumeIcon = () => {
        if (osVolume === 0) return '🔇';
        if (osVolume < 0.33) return '🔈';
        if (osVolume < 0.66) return '🔉';
        return '🔊';
    };

    return (
        <div className="volume-control-container" ref={containerRef}>
            <div 
                className={`tray-icon volume-icon ${isOpen ? 'active' : ''}`} 
                onClick={() => setIsOpen(!isOpen)}
                title="Volume"
                onMouseEnter={() => playSound('bubble')}
            >
                {getVolumeIcon()}
            </div>

            {isOpen && (
                <div className="volume-flyout win7-glass">
                    <div className="volume-slider-container">
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01" 
                            value={osVolume} 
                            onChange={handleVolumeChange}
                            className="volume-slider-vertical"
                        />
                    </div>
                    <div className="volume-percentage">
                        {Math.round(osVolume * 100)}%
                    </div>
                    <div className="volume-mixer-link">Mixer</div>
                </div>
            )}
        </div>
    );
}

export default VolumeControl;
