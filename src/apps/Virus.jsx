import React, { useState, useEffect } from 'react';

function Virus({ onTrigger }) {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Checking for system updates...');

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + Math.random() * 5;
                if (next >= 100) {
                    clearInterval(interval);
                    setStatus('Applying critical security patches...');
                    setTimeout(() => {
                        onTrigger();
                    }, 1000);
                    return 100;
                }
                return next;
            });
        }, 300);

        return () => clearInterval(interval);
    }, [onTrigger]);

    return (
        <div className="virus-app-container" style={{ padding: '20px', background: '#f0f0f0', height: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <img src="/assets/icons/security.png" alt="" style={{ width: 48, height: 48 }} />
                <div>
                    <h3 style={{ margin: 0, fontSize: '14px', color: '#003399' }}>FrutigerOS Security Update</h3>
                    <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Version 7.1.7601 (Service Pack 1)</p>
                </div>
            </div>

            <div style={{ marginTop: '10px' }}>
                <div style={{ fontSize: '12px', marginBottom: '5px', color: '#333' }}>{status}</div>
                <div className="win7-progress-bar">
                    <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div style={{ fontSize: '11px', color: '#666', marginTop: '5px', textAlign: 'right' }}>
                    {Math.round(progress)}% Complete
                </div>
            </div>

            <div style={{ flex: 1, border: '1px solid #ccc', background: 'white', padding: '10px', fontSize: '11px', overflowY: 'auto', color: '#444' }}>
                <p>Initializing security module...</p>
                <p>Scanning system files (C:\Windows\System32)...</p>
                {progress > 20 && <p>Checking registry integrity...</p>}
                {progress > 50 && <p>Verifying digital signatures...</p>}
                {progress > 80 && <p>Ready to apply patches.</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button className="win7-btn-std" disabled>Cancel</button>
            </div>
        </div>
    );
}

export default Virus;
