import React, { useState } from 'react';

const sysData = {
    name: "Administrator",
    title: "System Developer & Aero Specialist",
    subtitle: "explorer.os",
    summary: "A digital craftsman dedicated to resurrecting the 'Frutiger Aero' aesthetic through modern web technologies. Expert in high-fidelity UI modeling and immersive user experiences.",
    experience: [
        { company: "Aero Design Labs", role: "Lead UI Architect", period: "2023 - Present", desc: "Pioneering the modern resurgence of glossy, skeuomorphic web interfaces." },
        { company: "Open Source Community", role: "WebOS Contributor", period: "2022 - 2023", desc: "Collaborated on architectural design for web-based operating systems and UI frameworks." }
    ],
    projects: [
        { name: "Frutiger OS", desc: "The ultimate Windows 7 / Vista tribute OS built with Vanilla JS and CSS.", link: "#" },
        { name: "Aqua-Flow Engine", desc: "A JavaScript physics engine for realistic liquid glass effects.", link: "#" },
        { name: "Skeuo-Kit", desc: "A comprehensive library for early 2010s mobile UI components.", link: "#" }
    ],
    skills: ["Photography", "Web Development(HTML, CSS, JS)", "Video Editing(Adobe Premiere Pro)", "3D Modeling(Blender)", "Graphic Design(Adobe Photoshop)"]
};

function Portfolio({ playSound }) {
    const [activeTab, setActiveTab] = useState('system');

    const handleTabClick = (tabId) => {
        playSound('click');
        setActiveTab(tabId);
    };

    return (
        <div className="sys-info-container">
            {/* Sidebar */}
            <div className="sys-sidebar">
                <div className={`sys-sidebar-item ${activeTab === 'system' ? 'active' : ''}`} onClick={() => handleTabClick('system')}>Control Panel Home</div>
                <div className="sys-sidebar-item">Device Manager</div>
                <div className="sys-sidebar-item">Remote settings</div>
                <div className="sys-sidebar-item">System protection</div>
                <div className="sys-sidebar-item">Advanced system settings</div>

                <div style={{ marginTop: 'auto', padding: '0 20px' }}>
                    <div style={{ fontSize: 11, color: '#6d84a3', borderTop: '1px solid rgba(0, 102, 204, 0.1)', paddingTop: 15, marginBottom: 10, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' }}>See also</div>
                    <div className="sys-sidebar-item">Action Center</div>
                    <div className="sys-sidebar-item">Frutiger Update</div>
                    <div className="sys-sidebar-item">Performance Information</div>
                </div>
            </div>

            {/* Main Content */}
            <div className="sys-main-content">
                <div className="sys-breadcrumb">
                    <span>Control Panel</span> &gt; <span>System and Security</span> &gt; System
                </div>

                <div className="glossy-header">
                    <div className="glass-reflection"></div>
                    <h1 style={{ margin: 0, fontSize: 24, fontWeight: 300, textShadow: '0 1px 2px rgba(0,0,0,0.2)' }}>{sysData.name}</h1>
                    <p style={{ margin: '2px 0 0 0', opacity: 0.9, fontSize: 13 }}>{sysData.title}</p>
                </div>

                {/* Windows edition */}
                <div className="sys-section">
                    <div className="sys-section-title">Frutiger OS edition</div>
                    <div className="sys-row">
                        <div className="sys-value" style={{ fontWeight: 'bold', fontSize: 14, color: '#003399' }}>Frutiger OS Ultimate</div>
                    </div>
                    <div className="sys-row">
                        <div className="sys-label">Copyright:</div>
                        <div className="sys-value">© 2026 {sysData.name}. All rights reserved.</div>
                    </div>
                </div>

                {/* System */}
                <div className="sys-section">
                    <div className="sys-section-title">System Properties</div>
                    <div className="sys-row" style={{ marginBottom: 15 }}>
                        <div className="sys-label">Summary:</div>
                        <div className="sys-value" style={{ lineHeight: 1.5 }}>{sysData.summary}</div>
                    </div>
                    <div className="sys-row">
                        <div className="sys-label">Skills:</div>
                        <div className="sys-value">
                            {sysData.skills.join(' • ')}
                        </div>
                    </div>
                    <div className="sys-row">
                        <div className="sys-label">Rating:</div>
                        <div className="sys-value" style={{ color: '#0066cc', fontWeight: 'bold' }}>7.9 Frutiger Experience Index</div>
                    </div>
                </div>

                {/* Developer Info */}
                <div className="sys-section">
                    <div className="sys-section-title">Contact & Projects</div>
                    <div className="sys-row">
                        <div className="sys-label">Website:</div>
                        <div className="sys-value" style={{ color: '#0066cc', cursor: 'pointer', textDecoration: 'underline' }}>{sysData.subtitle}</div>
                    </div>
                    <div className="sys-row">
                        <div className="sys-label">Featured Projects:</div>
                        <div className="sys-value">
                            {sysData.projects.map((proj, idx) => (
                                <div key={idx} style={{ marginBottom: 6 }}>
                                    <span style={{ fontWeight: 'bold' }}>{proj.name}</span>: {proj.desc}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="sys-section">
                    <div className="sys-section-title">Support</div>
                    <div className="sys-row" style={{ marginBottom: 0 }}>
                        <div className="sys-label">Support Status:</div>
                        <div className="sys-value">24/7 Digital Craftsmanship • {sysData.name}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
