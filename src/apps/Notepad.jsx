import React, { useState } from 'react';

function Notepad() {
    const [cursorPos, setCursorPos] = useState({ ln: 1, col: 1 });

    const handleTextChange = (e) => {
        const text = e.target.value;
        const sub = text.substring(0, e.target.selectionStart);
        const lines = sub.split('\n');
        setCursorPos({
            ln: lines.length,
            col: lines[lines.length - 1].length + 1
        });
    };

    return (
        <div className="notepad-container">
            <div className="notepad-menu">
                <span className="notepad-menu-item">File</span>
                <span className="notepad-menu-item">Edit</span>
                <span className="notepad-menu-item">Format</span>
                <span className="notepad-menu-item">View</span>
                <span className="notepad-menu-item">Help</span>
            </div>
            <textarea
                className="notepad-textarea"
                onKeyUp={handleTextChange}
                onClick={handleTextChange}
                onSelect={handleTextChange}
                defaultValue={`Welcome to FrutigerOS. This is my first attempt at creating a web-based operating system.

This system was built to demonstrate high-fidelity UI interaction and skeuomorphic design principles. Using a blend of authentic Windows 7 assets and modern React components, I've created a desktop environment that captures the optimistic futurism of the late 2000s.

Feel free to explore my personal journey and projects via the portal in the "System Information" app.

Best regards,

██╗    ██╗██╗   ██╗ █████╗ ████████╗████████╗
██║    ██║╚██╗ ██╔╝██╔══██╗╚══██╔══╝╚══██╔══╝
██║ █╗ ██║ ╚████╔╝ ███████║   ██║      ██║   
██║███╗██║  ╚██╔╝  ██╔══██║   ██║      ██║   
╚███╔███╔╝   ██║   ██║  ██║   ██║      ██║   
 ╚══╝╚══╝    ╚═╝   ╚═╝  ╚═╝   ╚═╝      ╚═╝   

 ██████╗ █████╗ ██████╗  █████╗ ███╗   ██╗██╗███████╗███████╗
██╔════╝██╔══██╗██╔══██╗██╔══██╗████╗  ██║██║██╔════╝██╔════╝
██║     ███████║██████╔╝███████║██╔██╗ ██║██║███████╗███████╗
██║     ██╔══██║██╔══██╗██╔══██║██║╚██╗██║██║╚════██║╚════██║
╚██████╗██║  ██║██████╔╝██║  ██║██║ ╚████║██║███████║███████║
 ╚═════╝╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝╚══════╝╚══════╝`}
            />
            <div className="notepad-status">
                <div className="status-left"></div>
                <div className="status-field">
                    Ln {cursorPos.ln}, Col {cursorPos.col}
                </div>
                <div className="status-field" style={{ minWidth: 60 }}>
                    100%
                </div>
                <div className="status-field" style={{ minWidth: 100 }}>
                    Windows (CRLF)
                </div>
                <div className="status-field" style={{ minWidth: 100, borderRight: '1px solid #ccc' }}>
                    UTF-8
                </div>
            </div>
        </div>
    );
}

export default Notepad;
