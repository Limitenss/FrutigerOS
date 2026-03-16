import React, { useState } from 'react';

const WALLPAPERS = [
    { name: 'Aero Default', url: '/assets/images/win7_login_bg.png' },
    { name: 'Aurora', url: '/assets/images/fa_bg_aurora.png' },
    { name: 'Glass Peaks', url: '/assets/images/fa_bg_glass_peaks.png' },
    { name: 'Oceanic', url: '/assets/images/fa_bg_oceanic.png' },
    { name: 'Daniele', url: '/assets/images/alaa_1.jpg' },
    { name: 'Everett', url: '/assets/images/everett.jpg' },
    { name: 'Alaa', url: '/assets/images/daniele_8.jpg' },
];

const WINDOW_COLORS = [
    { name: 'Sky', id: 'sky', color: '#70c5ff' },
    { name: 'Frost', id: 'frost', color: '#e0f1ff' },
    { name: 'Graphite', id: 'graphite', color: '#444444' },
    { name: 'Sea', id: 'sea', color: '#00ccaa' },
    { name: 'Burgundy', id: 'burgundy', color: '#882222' },
];

function Personalization({ currentWallpaper, setWallpaper, currentColor, setWindowColor, transparency, setTransparency, currentSoundScheme, setSoundScheme }) {
    const [activeTab, setActiveTab] = useState('wallpaper');

    return (
        <div className="personalization-container sys-info-container">
            <div className="personalization-sidebar sys-sidebar" style={{ width: 180 }}>
                <div 
                    className={`sys-sidebar-item ${activeTab === 'wallpaper' ? 'active' : ''}`}
                    onClick={() => setActiveTab('wallpaper')}
                >
                    Desktop Background
                </div>
                <div 
                    className={`sys-sidebar-item ${activeTab === 'color' ? 'active' : ''}`}
                    onClick={() => setActiveTab('color')}
                >
                    Window Color
                </div>
                <div 
                    className={`sys-sidebar-item ${activeTab === 'sounds' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sounds')}
                >
                    Sounds
                </div>
                <div className="sys-sidebar-item" style={{ opacity: 0.5, cursor: 'default' }}>Screen Saver</div>
            </div>

            <div className="personalization-body sys-main-content" style={{ padding: '25px 35px' }}>
                {activeTab === 'wallpaper' && (
                    <div className="wallpaper-grid">
                        <h3>Select a Background</h3>
                        <div className="grid-list">
                            {WALLPAPERS.map(wp => (
                                <div 
                                    key={wp.url} 
                                    className={`wallpaper-item ${currentWallpaper === wp.url ? 'active' : ''}`}
                                    onClick={() => setWallpaper(wp.url)}
                                >
                                    <div className="wallpaper-preview" style={{ backgroundImage: `url(${wp.url})` }}></div>
                                    <span>{wp.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'color' && (
                    <div className="color-settings">
                        <h3>Choose your window color</h3>
                        <p>Change the color of your window borders, Start menu, and taskbar.</p>
                        <div className="color-list">
                            {WINDOW_COLORS.map(color => (
                                <div 
                                    key={color.id} 
                                    className={`color-swatch ${currentColor === color.id ? 'active' : ''}`}
                                    onClick={() => setWindowColor(color.id)}
                                    title={color.name}
                                >
                                    <div className="swatch-inner" style={{ backgroundColor: color.color }}></div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="transparency-setting">
                            <label className="checkbox-container">
                                <input 
                                    type="checkbox" 
                                    checked={transparency} 
                                    onChange={(e) => setTransparency(e.target.checked)} 
                                />
                                <span className="checkmark"></span>
                                Enable transparency
                            </label>
                        </div>
                    </div>
                )}
                {activeTab === 'sounds' && (
                    <div className="sound-settings">
                        <h3>Sound Schemes</h3>
                        <p>A sound scheme is a set of sounds applied to events in Windows and programs.</p>
                        
                        <div className="scheme-selector" style={{ marginTop: 20 }}>
                            <div 
                                className={`scheme-option ${currentSoundScheme === 'windows-default' ? 'active' : ''}`}
                                onClick={() => setSoundScheme('windows-default')}
                            >
                                <span className="scheme-name">Windows Default</span>
                                <span className="scheme-desc">Standard Aero sound scheme</span>
                            </div>
                            <div 
                                className={`scheme-option ${currentSoundScheme === 'nature' ? 'active' : ''}`}
                                onClick={() => setSoundScheme('nature')}
                            >
                                <span className="scheme-name">Nature</span>
                                <span className="scheme-desc">Bird chirps and organic sounds</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Personalization;
