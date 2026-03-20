import React, { useState, useEffect } from 'react';
import VolumeControl from './VolumeControl';
import ClockFlyout from './ClockFlyout';
import InternetFlyout from './InternetFlyout';
import './Taskbar.css';

function Taskbar({
    pinnedApps,
    openWindows,
    activeApp,
    launchApp,
    focusWindow,
    isStartMenuOpen,
    toggleStartMenu,
    APP_CONFIG,
    playSound,
    minimizeAll,
    osVolume,
    setOsVolume,
    setIsPeeking
}) {
    const [isClockOpen, setIsClockOpen] = useState(false);
    const [isInternetOpen, setIsInternetOpen] = useState(false);
    const [hoveredApp, setHoveredApp] = useState(null);

    const activeWindows = Object.keys(openWindows);
    const allToRender = Array.from(new Set([...pinnedApps, ...activeWindows]));

    return (
        <div id="taskbar" className="win7-glass">
            <div className="taskbar-left">
                <div
                    id="start-button"
                    className={`start-orb ${isStartMenuOpen ? 'active' : ''}`}
                    onClick={toggleStartMenu}
                ></div>

                {allToRender.map(appId => {
                    const config = APP_CONFIG[appId];
                    if (!config) return null;

                    const isOpen = !!openWindows[appId];
                    const isActive = activeApp === appId;

                    return (
                        <div
                            key={appId}
                            className={`taskbar-item ${isOpen ? 'open' : ''} ${isActive ? 'active' : ''}`}
                            onClick={() => {
                                if (isOpen) {
                                    focusWindow(appId);
                                } else {
                                    launchApp(appId);
                                }
                            }}
                            onMouseEnter={() => {
                                playSound('bubble');
                                setHoveredApp(appId);
                            }}
                            onMouseLeave={() => setHoveredApp(null)}
                        >
                            <img src={config.icon} alt={config.name} style={{ width: 24, height: 24 }} />
                            {isOpen && <div className="taskbar-item-indicator"></div>}

                            {hoveredApp === appId && (
                                <div className="aero-thumbnail win7-glass">
                                    <div className="thumbnail-header">
                                        <img src={config.icon} alt="" style={{ width: 14, height: 14 }} />
                                        <span>{config.name}</span>
                                    </div>
                                    <div className="thumbnail-preview">
                                        <div className="preview-placeholder">
                                            {isOpen ? "Active Session" : "Click to Launch"}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="taskbar-right">
                <VolumeControl
                    osVolume={osVolume}
                    setOsVolume={setOsVolume}
                    playSound={playSound}
                />
                <span
                    className={`tray-icon ${isInternetOpen ? 'active' : ''}`}
                    style={{ fontSize: 14, cursor: 'pointer' }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsInternetOpen(!isInternetOpen);
                        setIsClockOpen(false);
                    }}
                >
                    🌐
                </span>

                <div onClick={(e) => {
                    e.stopPropagation();
                    setIsClockOpen(!isClockOpen);
                    setIsInternetOpen(false);
                }}>
                    <Clock />
                </div>

                {isClockOpen && <ClockFlyout onClose={() => setIsClockOpen(false)} />}
                {isInternetOpen && <InternetFlyout onClose={() => setIsInternetOpen(false)} />}

                <div
                    id="show-desktop-btn"
                    title="Show Desktop"
                    onClick={minimizeAll}
                    onMouseEnter={() => setIsPeeking(true)}
                    onMouseLeave={() => setIsPeeking(false)}
                ></div>
            </div>
        </div>
    );
}

function Clock() {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const hours = time.getHours() % 12 || 12;
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const ampm = time.getHours() >= 12 ? 'PM' : 'AM';
    const dateStr = `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()}`;

    return (
        <div
            className="taskbar-clock"
            title={time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        >
            <span id="clock-time">{`${hours}:${minutes} ${ampm}`}</span>
            <span id="clock-date">{dateStr}</span>
        </div>
    );
}

export default React.memo(Taskbar);
