import React, { useState } from 'react';
import './StartMenu.css';

function StartMenu({ APP_CONFIG, launchApp, playSound, handleShutdown }) {
    const [searchTerm, setSearchTerm] = useState('');

    const apps = Object.entries(APP_CONFIG).filter(([id]) => !['documents', 'pictures', 'music', 'computer', 'settings', 'help'].includes(id));
    const filteredApps = apps.filter(([id, config]) =>
        config.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div id="start-menu" className="win7-glass">
            <div className="start-menu-main">
                <div className="start-menu-left">
                    <div className="start-menu-items">
                        {!searchTerm ? (
                            <>
                                <div style={{ fontSize: 11, color: '#666', padding: '5px 15px' }}>Recently Used</div>
                                {apps.slice(0, 6).map(([id, config]) => (
                                    <div
                                        key={id}
                                        className="start-menu-item"
                                        onClick={() => launchApp(id)}
                                        onMouseEnter={() => playSound('bubble')}
                                    >
                                        <img src={config.icon} alt={config.name} className="start-icon" />
                                        <span>{config.name}</span>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <>
                                <div style={{ fontSize: 11, color: '#0066cc', padding: '5px 15px', fontWeight: 'bold' }}>Programs</div>
                                {filteredApps.length > 0 ? filteredApps.map(([id, config]) => (
                                    <div
                                        key={id}
                                        className="start-menu-item"
                                        onClick={() => launchApp(id)}
                                        onMouseEnter={() => playSound('bubble')}
                                    >
                                        <img src={config.icon} alt={config.name} className="start-icon" />
                                        <span>{config.name}</span>
                                    </div>
                                )) : (
                                    <div style={{ padding: '10px 15px', color: '#666', fontSize: 12 }}>No programs found.</div>
                                )}
                            </>
                        )}
                    </div>
                </div>
                <div className="start-menu-right">
                    <div className="user-profile">
                        <div className="user-avatar">
                            <img src="/assets/images/user.webp" alt="Admin" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span>Admin</span>
                    </div>
                    <div className="start-menu-links">
                        <div className="start-link" onClick={() => launchApp('documents')}>Documents</div>
                        <div className="start-link" onClick={() => launchApp('pictures')}>Pictures</div>
                        <div className="start-link" onClick={() => launchApp('music')}>Music</div>
                        <hr />
                        <div className="start-link" onClick={() => launchApp('computer')}>Computer</div>
                        <div className="start-link" onClick={() => launchApp('settings')}>Control Panel</div>
                        <hr />
                        <div className="start-link" onClick={() => launchApp('help')}>Help and Support</div>
                    </div>
                </div>
            </div>
            <div className="start-menu-footer">
                <div className="start-search">
                    <span className="start-search-icon">🔍</span>
                    <input
                        type="text"
                        placeholder="Search programs and files"
                        id="start-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoComplete="off"
                    />
                </div>
                <div className="shutdown-btn-container">
                    <button className="shutdown-btn" onClick={handleShutdown}>
                        Shut down
                    </button>
                    <button className="shutdown-more">▶</button>
                </div>
            </div>
        </div>
    );
}

export default StartMenu;
