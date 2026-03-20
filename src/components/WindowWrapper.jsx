import React, { useState, useRef, useEffect } from 'react';

function WindowWrapper({
    appId,
    zIndex,
    children,
    onFocus,
    onMaximize,
    onClose,
    onMinimize,
    onShake,
    isMaximized,
    isMinimized,
    isActive,
    config
}) {
    const [pos, setPos] = useState({ x: 100 + (zIndex * 5), y: 50 + (zIndex * 5) });
    const [size, setSize] = useState({ w: 800, h: 550 });
    const isDragging = useRef(false);
    const isResizing = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const windowRef = useRef(null);

    // Shake detection refs
    const lastX = useRef(0);
    const lastDir = useRef(0); // 1 = right, -1 = left
    const dirChanges = useRef(0);
    const lastShakeTime = useRef(0);

    // Initial positioning logic
    useEffect(() => {
        // The original logic used `state` to determine winId, which is no longer passed directly.
        // For now, we'll keep the initial positioning based on zIndex as per the snippet's `pos` initialization.
        // If a global state for window order is needed, it would be managed outside this component.
        if (appId === 'calculator') {
            setSize({ w: 240, h: 360 });
        } else if (appId === 'pizzatron') {
            setSize({ w: 1040, h: 650 });
        }
    }, []);

    const handleMouseDown = (e) => {
        onFocus(appId);
        if (e.target.closest('.window-controls')) return;

        // If maximized, restore first then drag from center
        if (isMaximized) {
            onMaximize(appId);
            // We'll need better logic to position the window under the cursor after restore,
            // but for now, simple toggle is a start.
            return;
        }

        isDragging.current = true;
        const rect = windowRef.current.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };

        const onMouseMove = (e) => {
            if (!isDragging.current) return;
            let nextX = e.clientX - dragOffset.current.x;
            let nextY = e.clientY - dragOffset.current.y;
            if (nextY < 0) nextY = 0;
            setPos({ x: nextX, y: nextY });

            // Shake detection logic
            const deltaX = nextX - lastX.current;
            const currentDir = deltaX > 0 ? 1 : deltaX < 0 ? -1 : 0;

            if (currentDir !== 0 && currentDir !== lastDir.current) {
                const now = Date.now();
                if (now - lastShakeTime.current < 500) {
                    dirChanges.current += 1;
                    if (dirChanges.current > 3) { // Lower threshold for better reliability
                        onShake(appId);
                        dirChanges.current = 0;
                    }
                } else {
                    dirChanges.current = 0;
                }
                lastShakeTime.current = now;
                lastDir.current = currentDir;
            }
            lastX.current = nextX;
        };

        const onMouseUp = (e) => {
            isDragging.current = false;
            dirChanges.current = 0;

            // Aero Snap detection
            if (e.clientY < 5) {
                onMaximize(appId);
            } else if (e.clientX < 5) {
                setPos({ x: 0, y: 0 });
                setSize({ w: window.innerWidth / 2, h: window.innerHeight - 40 });
            } else if (e.clientX > window.innerWidth - 5) {
                setPos({ x: window.innerWidth / 2, y: 0 });
                setSize({ w: window.innerWidth / 2, h: window.innerHeight - 40 });
            }

            document.body.classList.remove('dragging-active');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.body.classList.add('dragging-active');
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    const handleResizeMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing.current = true;

        const startSize = { ...size };
        const startPos = { x: e.clientX, y: e.clientY };

        const onMouseMove = (e) => {
            if (!isResizing.current) return;
            const newW = Math.max(250, startSize.w + (e.clientX - startPos.x));
            const newH = Math.max(150, startSize.h + (e.clientY - startPos.y));
            setSize({ w: newW, h: newH });
        };

        const onMouseUp = () => {
            isResizing.current = false;
            document.body.classList.remove('dragging-active');
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.body.classList.add('dragging-active');
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    if (isMinimized) return null;

    return (
        <div
            ref={windowRef}
            className={`os-window win7-glass ${isActive ? 'active' : ''} ${isMaximized ? 'maximized' : ''} ${isMinimized ? 'minimized' : ''} ${appId}`}
            style={{
                zIndex,
                left: isMaximized ? 0 : pos.x,
                top: isMaximized ? 0 : pos.y,
                width: isMaximized ? '100vw' : size.w,
                height: isMaximized ? 'calc(100vh - 40px)' : size.h,
                borderRadius: isMaximized ? 0 : 4,
                position: 'fixed'
            }}
            onMouseDown={() => onFocus(appId)}
        >
            <div className="window-header" onMouseDown={handleMouseDown}>
                <div className="window-title">
                    <img src={config.icon} style={{ width: 14, height: 14 }} alt="Icon" />
                    {config.name}
                </div>
                <div className="window-controls">
                    <div className="win-btn win-min" onClick={(e) => { e.stopPropagation(); onMinimize(appId); }}>_</div>
                    <div className="win-btn win-max" onClick={(e) => { e.stopPropagation(); onMaximize(appId); }}>□</div>
                    <div className="win-btn win-close" onClick={(e) => { e.stopPropagation(); onClose(appId); }}>✕</div>
                </div>
            </div>
            <div className="window-body">
                {children}
            </div>
            {!isMaximized && <div className="window-resizer" onMouseDown={handleResizeMouseDown}></div>}
        </div>
    );
}

export default WindowWrapper;
