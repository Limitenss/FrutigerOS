import React, { useState, useEffect, useRef } from 'react';

function MediaPlayer({ osVolume, playSound }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');
    const audioRef = useRef(new Audio('/assets/music/reflection pond.mp3'));

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true;

        const formatTime = (secs) => {
            if (isNaN(secs)) return '0:00';
            const mins = Math.floor(secs / 60);
            const s = Math.floor(secs % 60);
            return `${mins}:${s < 10 ? '0' : ''}${s}`;
        };

        const updateProgress = () => {
            const percent = (audio.currentTime / audio.duration) * 100;
            setProgress(percent);
            setCurrentTime(formatTime(audio.currentTime));
            setDuration(formatTime(audio.duration));
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', updateProgress);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', updateProgress);
            audio.pause();
        };
    }, []);

    useEffect(() => {
        audioRef.current.volume = osVolume;
    }, [osVolume]);

    const togglePlay = () => {
        playSound('bubble');
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="wmp-container">
            {/* Top Navigation Bar */}
            <div className="wmp-nav-bar">
                <div className="wmp-nav-item active">Now Playing</div>
                <div className="wmp-nav-item">Library</div>
                <div className="wmp-nav-item">Play</div>
                <div className="wmp-nav-item">Burn</div>
                <div className="wmp-nav-item">Sync</div>
            </div>

            {/* Main Content Area */}
            <div className="wmp-content">
                <div className="wmp-visualizer-glow"></div>

                <div style={{ width: 180, height: 180, background: 'rgba(255,255,255,0.05)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255,255,255,0.1)', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                    <div className={`music-disc ${isPlaying ? 'playing' : ''}`} style={{
                        width: 140,
                        height: 140,
                        background: 'radial-gradient(circle, #444 0%, #111 30%, #1a1a1a 70%)',
                        borderRadius: '50%',
                        border: '2px solid #333',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'absolute', top: '10%', left: '10%', width: '80%', height: '80%', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '50%' }}></div>
                    </div>
                </div>

                <div style={{ marginTop: 30, textAlign: 'center', zIndex: 1 }}>
                    <h2 style={{ margin: 0, fontSize: 18, fontWeight: 400, color: '#fff' }}>Reflection Pond</h2>
                    <p style={{ margin: '5px 0 0', fontSize: 13, opacity: 0.6 }}>Aero Flow</p>
                </div>
            </div>

            {/* Glossy Control Bar */}
            <div className="wmp-control-bar">
                {/* Seek Bar */}
                <div className="wmp-seek-container">
                    <div className="wmp-seek-track">
                        <div className="wmp-seek-fill" style={{ width: `${progress}%` }}>
                            <div className="wmp-seek-handle"></div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="wmp-controls-row">
                    <div className="wmp-time-display">{currentTime} / {duration}</div>

                    <button className="wmp-btn-round" title="Shuffle">
                        <span style={{ fontSize: 14 }}>🔀</span>
                    </button>

                    <button className="wmp-btn-round" title="Previous">
                        <img src="/assets/icons/141.png" style={{ width: 14, transform: 'scaleX(-1)' }} alt="Prev" />
                    </button>

                    <button className="wmp-btn-main" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
                        <img src={isPlaying ? "/assets/icons/pause.png" : "/assets/icons/play.png"} style={{ width: 50, height: 50 }} alt="Play/Pause" />
                    </button>

                    <button className="wmp-btn-round" title="Next">
                        <img src="/assets/icons/141.png" style={{ width: 14 }} alt="Next" />
                    </button>

                    <button className="wmp-btn-round" title="Repeat">
                        <span style={{ fontSize: 14 }}>🔁</span>
                    </button>

                    <div className="wmp-volume-container">
                        <img src="/assets/icons/064.png" style={{ width: 16 }} alt="Volume" />
                        <div style={{ width: 60, height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                            <div style={{ width: `${osVolume * 100}%`, height: '100%', background: '#7ab5e5' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MediaPlayer;
