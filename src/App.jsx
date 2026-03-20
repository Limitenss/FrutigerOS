import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import './index.css';

const SOUNDS = {
  'windows-default': {
    click: '/assets/sounds/click.wav',
    startup: '/assets/sounds/startup.wav',
    logon: '/assets/sounds/logon.wav',
    shutdown: '/assets/sounds/shutdown.wav',
    error: '/assets/sounds/error.wav',
    open: '/assets/sounds/open.wav',
    close: '/assets/sounds/close.wav',
    bubble: '/assets/sounds/bubble.wav',
    glass: '/assets/sounds/glass.wav'
  },
  'nature': {
    click: '/assets/sounds/nature-click.wav',
    startup: '/assets/sounds/startup.wav',
    logon: '/assets/sounds/nature-logon.wav',
    shutdown: '/assets/sounds/nature-shutdown.wav',
    error: '/assets/sounds/nature-error.wav',
    open: '/assets/sounds/nature-open.wav',
    close: '/assets/sounds/nature-close.wav',
    bubble: '/assets/sounds/nature-bubble.wav',
    glass: '/assets/sounds/nature-glass.wav'
  }
};

const APP_CONFIG = {
  browser: { name: 'Internet Explorer', icon: '/assets/icons/ie.ico' },
  calculator: { name: 'Calculator', icon: '/assets/icons/calc.ico' },
  music: { name: 'Media Player', icon: '/assets/icons/wmp.ico' },
  notepad: { name: 'Notepad', icon: '/assets/icons/013.png' },
  photos: { name: 'Photos', icon: '/assets/icons/explorer.ico' },
  minesweeper: { name: 'Minesweeper', icon: '/assets/icons/calc.ico' },
  settings: { name: 'Settings', icon: '/assets/icons/explorer.ico' },
  portfolio: { name: 'System Information', icon: '/assets/icons/177.png' },
  pizzatron: { name: 'Pizzatron', icon: '/apps/pizzatron/Assets/Logo.png' },
  personalization: { name: 'Personalization', icon: '/assets/icons/212.png' },
  documents: { name: 'Documents', icon: '/assets/icons/explorer.ico' },
  pictures: { name: 'Pictures', icon: '/assets/icons/explorer.ico' },
  computer: { name: 'Computer', icon: '/assets/icons/explorer.ico' },
  virus: { name: 'Security_Update.exe', icon: '/assets/icons/security.png' }
};

import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import WindowWrapper from './components/WindowWrapper';
const Notepad = lazy(() => import('./apps/Notepad'));
const Calculator = lazy(() => import('./apps/Calculator'));
const Portfolio = lazy(() => import('./apps/Portfolio'));
const Browser = lazy(() => import('./apps/Browser'));
const MediaPlayer = lazy(() => import('./apps/MediaPlayer'));
const Pizzatron = lazy(() => import('./apps/Pizzatron'));
const Personalization = lazy(() => import('./apps/Personalization'));
const Minesweeper = lazy(() => import('./apps/Minesweeper'));
const Photos = lazy(() => import('./apps/Photos'));
const Virus = lazy(() => import('./apps/Virus'));

function App() {
  const [stage, setStage] = useState('login'); // 'login' | 'authenticating' | 'password' | 'desktop'
  const [openWindows, setOpenWindows] = useState({}); // { appId: { zIndex, isMinimized, isMaximized } }
  const [activeApp, setActiveApp] = useState(null);
  const [isStartMenuOpen, setIsStartMenuOpen] = useState(false);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [osVolume, setOsVolume] = useState(0.5);
  const [pinnedApps, setPinnedApps] = useState(['browser', 'calculator', 'music', 'notepad', 'portfolio', 'pizzatron']);
  const [passwordValue, setPasswordValue] = useState('');
  const [shutdownStage, setShutdownStage] = useState(null); // null | 'fading' | 'monitor' | 'booting'

  // Personalization States
  const [wallpaper, setWallpaper] = useState('/assets/images/win7_login_bg.webp');
  const [windowColor, setWindowColor] = useState('sky'); // sky, frost, graphite, etc.
  const [transparency, setTransparency] = useState(true);
  const [soundScheme, setSoundScheme] = useState('windows-default');
  const [isPeeking, setIsPeeking] = useState(false);
  const [isPrankMode, setIsPrankMode] = useState(false);
  const [errorWindows, setErrorWindows] = useState([]); // Array of { id, x, y }

  useEffect(() => {
    // Load from cookies
    const getCookie = (name) => {
      const val = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
      return val ? val.pop() : null;
    };

    const savedWallpaper = getCookie('os_wallpaper');
    const savedColor = getCookie('os_window_color');
    const savedTrans = getCookie('os_transparency');
    const savedSound = getCookie('os_sound_scheme');

    if (savedWallpaper) setWallpaper(savedWallpaper);
    if (savedColor) setWindowColor(savedColor);
    if (savedTrans !== null) setTransparency(savedTrans === 'true');
    if (savedSound) setSoundScheme(savedSound);
  }, []);

  const updateWallpaper = (url) => {
    setWallpaper(url);
    document.cookie = `os_wallpaper=${url}; max-age=31536000; path=/`;
  };

  const updateWindowColor = (color) => {
    setWindowColor(color);
    document.cookie = `os_window_color=${color}; max-age=31536000; path=/`;
  };

  const updateTransparency = (val) => {
    setTransparency(val);
    document.cookie = `os_transparency=${val}; max-age=31536000; path=/`;
  };

  const updateSoundScheme = (val) => {
    setSoundScheme(val);
    document.cookie = `os_sound_scheme=${val}; max-age=31536000; path=/`;
  };

  const lastPlayed = useRef({});

  const playSound = useCallback((type) => {
    const scheme = SOUNDS[soundScheme] || SOUNDS['windows-default'];
    const url = scheme[type];
    if (!url) return;

    const now = Date.now();
    if (type === 'bubble' && lastPlayed.current[type] && now - lastPlayed.current[type] < 300) {
      return;
    }
    lastPlayed.current[type] = now;

    const audio = new Audio(url);
    const multiplier = type === 'bubble' ? 0.4 : 1.0;
    audio.volume = osVolume * multiplier;
    audio.play().catch(e => console.warn('Audio play blocked:', e));
  }, [osVolume, soundScheme]);

  const handleLoginStart = () => {
    playSound('click');
    setStage('authenticating');
    setTimeout(() => {
      setStage('password');
      autoTypePassword();
    }, 1500);
  };

  const autoTypePassword = () => {
    const defaultPassword = '••••••••';
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < defaultPassword.length) {
        setPasswordValue(prev => prev + '•');
        playSound('click');
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 120);
  };

  const finalizeLogin = () => {
    playSound('logon');
    setStage('desktop');
    setTimeout(() => {
      launchApp('notepad');
    }, 800);
  };

  const launchApp = useCallback((appId) => {
    playSound('open');
    setOpenWindows(prev => {
      if (prev[appId]) {
        return {
          ...prev,
          [appId]: { ...prev[appId], isMinimized: false, zIndex: zIndexCounter + 1 }
        };
      }
      return {
        ...prev,
        [appId]: { zIndex: zIndexCounter + 1, isMinimized: false, isMaximized: false }
      };
    });
    setZIndexCounter(prev => prev + 1);
    setActiveApp(appId);
    if (isStartMenuOpen) setIsStartMenuOpen(false);
  }, [zIndexCounter, isStartMenuOpen, playSound]);

  const closeWindow = useCallback((appId) => {
    playSound('close');
    setOpenWindows(prev => {
      const next = { ...prev };
      delete next[appId];
      return next;
    });
    if (activeApp === appId) setActiveApp(null);
  }, [activeApp, playSound]);

  const minimizeWindow = useCallback((appId) => {
    setOpenWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isMinimized: true }
    }));
    setActiveApp(null);
  }, []);

  const toggleMaximize = useCallback((appId) => {
    setOpenWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], isMaximized: !prev[appId].isMaximized }
    }));
  }, []);

  const minimizeAll = useCallback(() => {
    setOpenWindows(prev => {
      const next = {};
      Object.keys(prev).forEach(id => {
        next[id] = { ...prev[id], isMinimized: true };
      });
      return next;
    });
    setActiveApp(null);
  }, []);

  const focusWindow = useCallback((appId) => {
    setZIndexCounter(prev => prev + 1);
    setOpenWindows(prev => ({
      ...prev,
      [appId]: { ...prev[appId], zIndex: zIndexCounter + 1, isMinimized: false }
    }));
    setActiveApp(appId);
  }, [zIndexCounter]);

  const handleShake = useCallback((shakerId) => {
    setOpenWindows(prev => {
      const next = { ...prev };
      Object.keys(next).forEach(id => {
        if (id !== shakerId) {
          next[id] = { ...next[id], isMinimized: true };
        }
      });
      return next;
    });
    playSound('bubble');
  }, [playSound]);

  const handleShutdown = useCallback(() => {
    playSound('shutdown');
    setShutdownStage('fading');
    setIsStartMenuOpen(false);

    // Step 1: Fade to black
    setTimeout(() => {
      setShutdownStage('monitor');
    }, 4000); // 4 seconds for the "Shutting down" message and sound
  }, [playSound]);

  const handlePowerOn = useCallback(() => {
    playSound('startup');
    setShutdownStage('starting');

    // Step 2: Show startup animation for 2 seconds
    setTimeout(() => {
      setShutdownStage('show-dialog');

      // Step 3: Show cropped dialog, then zoom after a short delay
      setTimeout(() => {
        setShutdownStage('booting');

        // Step 4: Final transition back to login
        setTimeout(() => {
          setStage('login');
          setShutdownStage(null);
          setOpenWindows({});
          setActiveApp(null);
          setPasswordValue('');
        }, 1200); // Wait for zoom animation
      }, 1500);
    }, 2000);
  }, [playSound]);

  const triggerPrank = useCallback(() => {
    setIsPrankMode(true);
    playSound('error');

    // Spawn error windows over time
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const id = `error-${Date.now()}-${i}`;
        const x = Math.random() * (window.innerWidth - 300);
        const y = Math.random() * (window.innerHeight - 200);
        setErrorWindows(prev => [...prev, { id, x, y }]);
        playSound('error');
      }, i * 400);
    }

    // Trigger BSOD after errors finish
    setTimeout(() => {
      setStage('bsod');
      setErrorWindows([]);
      setIsPrankMode(false);

      // Auto-reboot after BSOD
      setTimeout(() => {
        setShutdownStage('monitor');
        setStage('login'); // Reset stage for when it comes back

        // Start boot sequence automatically
        setTimeout(() => {
          handlePowerOn();
        }, 1000);
      }, 4000);
    }, 8 * 400 + 3000);
  }, [playSound, handlePowerOn]);

  const closeError = (id) => {
    setErrorWindows(prev => prev.filter(win => win.id !== id));
    playSound('click');
  };

  const renderAppContent = (appId) => {
    return (
      <Suspense fallback={<div className="win7-loading-fallback"><div className="login-spinner"></div></div>}>
        {(() => {
          switch (appId) {
            case 'notepad': return <Notepad />;
            case 'calculator': return <Calculator playSound={playSound} />;
            case 'portfolio': return <Portfolio playSound={playSound} />;
            case 'browser': return <Browser playSound={playSound} />;
            case 'music': return <MediaPlayer osVolume={osVolume} playSound={playSound} />;
            case 'pizzatron': return <Pizzatron />;
            case 'personalization': return <Personalization
              currentWallpaper={wallpaper}
              setWallpaper={updateWallpaper}
              currentColor={windowColor}
              setWindowColor={updateWindowColor}
              transparency={transparency}
              setTransparency={updateTransparency}
              currentSoundScheme={soundScheme}
              setSoundScheme={updateSoundScheme}
            />;
            case 'minesweeper': return <Minesweeper />;
            case 'photos': return <Photos />;
            case 'virus': return <Virus onTrigger={triggerPrank} />;
            default: return <div style={{ padding: 20 }}>Not Available</div>;
          }
        })()}
      </Suspense>
    );
  };

  return (
    <div className={`os-root theme-${windowColor} ${transparency ? 'transparency-on' : 'transparency-off'} ${isPeeking ? 'peeking-active' : ''} ${isPrankMode ? 'prank-glitch' : ''}`}>
      <div className="global-vignette"></div>
      <div
        id="desktop-wallpaper"
        className="desktop-wallpaper"
        style={{ backgroundImage: `url(${wallpaper})` }}
      ></div>

      {stage !== 'desktop' && (
        <div id="welcome-screen" className="win7-login">
          <div className="login-background-overlay"></div>

          {stage === 'login' && (
            <div id="login-phase-user" className="login-phase">
              <div id="user-tile" className="user-tile" onClick={handleLoginStart}>
                <div className="user-avatar-frame">
                  <div className="user-avatar-large">
                    <div className="avatar-icon">
                      <img src="/assets/images/user.webp" alt="Admin" />
                    </div>
                  </div>
                </div>
                <span className="user-name">Administrator</span>
              </div>
            </div>
          )}

          {stage === 'authenticating' && (
            <div id="login-phase-loading" className="login-phase">
              <div className="login-spinner"></div>
              <span className="loading-text">Welcome</span>
            </div>
          )}

          {stage === 'password' && (
            <div id="login-phase-password" className="login-phase">
              <div className="user-avatar-frame small">
                <div className="user-avatar-small">
                  <div className="avatar-icon">
                    <img src="/assets/images/user.webp" alt="Admin" />
                  </div>
                </div>
              </div>
              <span className="user-name-small">Administrator</span>
              <div className="password-row">
                <input
                  type="password"
                  id="password-field"
                  className="win7-password"
                  value={passwordValue}
                  readOnly
                />
                <button id="login-btn" className="win7-login-btn" onClick={finalizeLogin}>➔</button>
              </div>
            </div>
          )}

          <div className="login-footer">
            <div className="login-branding">
              <span className="branding-logo">Frutiger OS 7 </span>
              <span className="branding-edition">Home Premium</span>
            </div>
          </div>

          <div className="login-actions-left">
            <button className="login-action-btn" title="Ease of Access">♿</button>
          </div>
          <div className="login-actions-right">
            <button id="login-shutdown-btn" className="login-action-btn" title="Shut down" onClick={handleShutdown}>⏻</button>
          </div>
        </div>
      )}

      {stage === 'bsod' && (
        <div className="bsod-container">
          <div className="bsod-content">
            <p>A problem has been detected and FrutigerOS has been shut down to prevent damage to your computer.</p>
            <p>CRITICAL_PROCESS_DIED</p>
            <p>If this is the first time you've seen this error screen, restart your computer. If this screen appears again, follow these steps:</p>
            <p>Check to make sure any new hardware or software is properly installed. If this is a new installation, ask your hardware or software manufacturer for any Windows updates you might need.</p>
            <p>If problems continue, disable or remove any newly installed hardware or software. Disable BIOS memory options such as caching or shadowing. If you need to use Safe Mode to remove or disable components, restart your computer, press F8 to select Advanced Startup Options, and then select Safe Mode.</p>
            <p>Technical information:</p>
            <p>*** STOP: 0x000000F4 (0x0000000000000003, 0xFFFFFA8007421B30, 0xFFFFFA8007421E10, 0xFFFFF80002F89940)</p>
            <p>Collecting data for crash dump...</p>
            <p>Initializing disk for crash dump...</p>
            <p>Beginning dump of physical memory.</p>
            <p>Dumping physical memory to disk: 100</p>
            <p>Physical memory dump complete.</p>
            <p>Contact your system admin or technical support group for further assistance.</p>
          </div>
        </div>
      )}

      {stage === 'desktop' && (
        <div id="desktop">
          <div id="desktop-icons">
            {Object.entries(APP_CONFIG).map(([id, config]) => {
              if (['documents', 'pictures', 'settings', 'computer'].includes(id)) return null;
              return (
                <div key={id} className="desktop-item" onClick={() => launchApp(id)}>
                  <img src={config.icon} className="desktop-icon-img" alt={config.name} />
                  <span>{config.name}</span>
                </div>
              );
            })}
          </div>

          <div id="window-container">
            {Object.entries(openWindows).map(([appId, state]) => (
              <WindowWrapper
                key={appId}
                appId={appId}
                config={APP_CONFIG[appId]}
                zIndex={state.zIndex}
                isMinimized={state.isMinimized}
                isMaximized={state.isMaximized}
                onClose={closeWindow}
                onMinimize={minimizeWindow}
                onMaximize={toggleMaximize}
                onFocus={focusWindow}
                onShake={handleShake}
                isActive={activeApp === appId}
              >
                {renderAppContent(appId)}
              </WindowWrapper>
            ))}

            {errorWindows.map(err => (
              <div
                key={err.id}
                className="win7-error-dialog win7-glass"
                style={{
                  position: 'absolute',
                  left: err.x,
                  top: err.y,
                  zIndex: 9999,
                  width: 350
                }}
              >
                <div className="error-header">
                  <span className="error-title">System Error</span>
                  <button className="error-close" onClick={() => closeError(err.id)}>✕</button>
                </div>
                <div className="error-body">
                  <div className="error-icon-red">X</div>
                  <div className="error-message">
                    A critical system error occurred. Memory at segment 0x004F2A could not be read.
                    <br /><br />
                    The system will now attempt to fix the error.
                  </div>
                </div>
                <div className="error-footer">
                  <button className="win7-btn-std" onClick={() => closeError(err.id)}>OK</button>
                  <button className="win7-btn-std" onClick={() => closeError(err.id)}>Details</button>
                </div>
              </div>
            ))}
          </div>

          <Taskbar
            pinnedApps={pinnedApps}
            openWindows={openWindows}
            activeApp={activeApp}
            launchApp={launchApp}
            focusWindow={focusWindow}
            isStartMenuOpen={isStartMenuOpen}
            toggleStartMenu={() => setIsStartMenuOpen(!isStartMenuOpen)}
            APP_CONFIG={APP_CONFIG}
            playSound={playSound}
            minimizeAll={minimizeAll}
            osVolume={osVolume}
            setOsVolume={setOsVolume}
            setIsPeeking={setIsPeeking}
          />

          {isStartMenuOpen && (
            <StartMenu
              APP_CONFIG={APP_CONFIG}
              launchApp={launchApp}
              playSound={playSound}
              handleShutdown={handleShutdown}
            />
          )}
        </div>
      )}

      {/* Shutdown Overlays */}
      {shutdownStage === 'fading' && (
        <div id="shutdown-overlay" className="active">
          <div className="shutdown-content">
            <div className="shutdown-spinner"></div>
            <span>Shutting down...</span>
          </div>
        </div>
      )}

      {(shutdownStage === 'monitor' || shutdownStage === 'starting' || shutdownStage === 'show-dialog' || shutdownStage === 'booting') && (
        <div id="monitor-scene" className={shutdownStage === 'booting' ? 'booting-zoom' : ''}>
          <div className="monitor-img-container">
            <img src="/assets/images/win7_monitor.png" className="monitor-img" alt="Samsung Monitor" />

            <div className="monitor-glow"></div>
            {/* Content inside the monitor screen */}
            {(shutdownStage === 'starting' || shutdownStage === 'show-dialog') && (
              <div className="monitor-screen-content">
                <div className="screen-effects"></div>
                {shutdownStage === 'show-dialog' && <div className="monitor-login-bg"></div>}
                {shutdownStage === 'starting' && <div className="startup-logo"></div>}
                {shutdownStage === 'show-dialog' && (
                  <div className="cropped-login-dialog">
                    <div className="cropped-avatar">
                      <img src="/assets/images/user.png" alt="Admin" />
                    </div>
                    <span className="cropped-name">Administrator</span>
                  </div>
                )}
              </div>
            )}

            <div id="monitor-power-btn" title="Power On" onClick={handlePowerOn}></div>
          </div>
        </div>
      )}
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
    <div className="taskbar-clock">
      <span id="clock-time">{`${hours}:${minutes} ${ampm}`}</span>
      <span id="clock-date">{dateStr}</span>
    </div>
  );
}

export default App;
