import React, { useState } from 'react';

const newsStories = [
    {
        id: 1,
        title: "Windows 7 Perfection: Global Release Today",
        summary: "Microsoft's latest OS reaches consumers, perfecting the Aero Glass aesthetic and taskbar experience.",
        content: "Redmond, WA — Today, October 22, 2009, Microsoft has officially released Windows 7. Refining the performance of Vista and polishing the Aero interface to a mirror shine, Windows 7 introduces 'Aero Peek' and 'Snap'. It is widely regarded as the pinnacle of desktop design, merging glass-like transparency with unmatched stability. Source: Microsoft News / Reuters."
    },
    {
        id: 2,
        title: "Apple Reinvents the Phone with iPhone",
        summary: "Steve Jobs unveils the iPhone at Macworld, promising a revolutionary mobile internet device.",
        content: "San Francisco, CA — In Jan 2007, Steve Jobs introduced the first iPhone. With its 'skeuomorphic' design featuring glossy icons that look like candy and a multi-touch interface, it has set a new standard for beauty and utility in tech. The 'Slide to Unlock' feature and high-gloss UI elements are already influencing designers worldwide. Source: Apple Press / Macworld."
    },
    {
        id: 3,
        title: "Wii Sports Becomes a Living Room Staple",
        summary: "Nintendo's clean, bubbly 'Mii' world brings gaming to everyone.",
        content: "Kyoto, Japan — The Nintendo Wii, released in late 2006, continues its unprecedented success. Its simple, blue-and-white 'translucent' UI and friendly Mii avatars have made gaming accessible to all ages. Wii Sports is being cited as a cultural milestone in the 'Frutiger Aero' era of clean, optimistic design. Source: Nintendo / GameSpot."
    },
    {
        id: 4,
        title: "Windows Vista: The Debut of Aero Glass",
        summary: "The long-awaited 'Longhorn' successor arrives with a bold new transparent look.",
        content: "Redmond, WA — Jan 2007 marked the launch of Windows Vista. While demanding on hardware, it introduced the 'Windows Aero' environment—a world of glass borders, real-time thumbnails, and 'Flip 3D'. It represents the boldest decorative shift in OS history toward the 'Frutiger' aesthetic. Source: CNET / Microsoft."
    },
    {
        id: 5,
        title: "Beijing 2008: A Spectacle of Light and Color",
        summary: "The XXIX Olympiad begins with a high-tech ceremony that captures the global imagination.",
        content: "Beijing, China — The 2008 Summer Olympics opening ceremony has stunned the world. The use of vibrant blue LEDs and fluid, liquid-like graphic design in the broadcasts reflects the global trend toward optimistic, high-gloss aesthetics. Analysts say the 'Be Water' theme perfectly matches the decade's design spirit. Source: BBC News / NBC Sports."
    },
    {
        id: 6,
        title: "Royal Wedding Captured in High Definition",
        summary: "Prince William and Catherine Middleton wed in a ceremony viewed by billions online.",
        content: "London, UK — April 2011. The Royal Wedding was one of the most-watched live-streamed events in history. The crisp HD broadcasts and accompanying digital media featured the clean, airy, and 'glossy' layouts typical of the early 2010s, symbolizing a modern monarchy in a digital age. Source: The Guardian / Associated Press."
    },
    {
        id: 7,
        title: "Curiosity Rover Lands on Mars",
        summary: "NASA's 'Seven Minutes of Terror' ends in success as Curiosity begins its mission.",
        content: "Pasadena, CA — August 2012. NASA's Jet Propulsion Laboratory erupted in cheers as Curiosity successfully touched down. The high-tech control room, filled with sleek monitors and clean data visualizations, represents the 'late-Aero' era's fascination with space and high-tech optimism. Source: NASA / New York Times."
    },
    {
        id: 8,
        title: "The iPad: A Magical and Revolutionary Device",
        summary: "Apple's new tablet aims to define a middle ground between the phone and the laptop.",
        content: "San Francisco, CA — April 2010. Steve Jobs has unveiled the iPad. The device brings the skeuomorphic touch interface of iOS to a large, 'glassy' display. It emphasizes the tactile, organic feeling of technology that the Frutiger Aero design movement has championed for years. Source: TechCrunch / Apple."
    },
    {
        id: 9,
        title: "Eco-Aero: The Rise of the Green Tech Movement",
        summary: "Technology firms embrace 'organic' design as environmental awareness grows.",
        content: "Global Trend — By 2008, the fusion of nature and technology—often called 'Eco-Aero'—has become dominant. Imagery of water droplets, green leaves, and solar panels against blue skies is seen in everything from solar charger ads to OS wallpapers, promoting a sustainable, high-tech future. Source: Design Week / Greenpeace."
    },
    {
        id: 10,
        title: "Frutiger Aero: The Aesthetic of Optimism",
        summary: "Designers analyze why gloss, glass, and gradients define the late 2000s.",
        content: "Design Critique — 2009. The 'Frutiger Aero' style, named after the popular typeface and the Windows interface, is at its peak. Professionals attribute its popularity to a global desire for technology that feels 'approachable' and 'clean' following the early-2000s grunge era. Source: Smashing Magazine / AIGA."
    }
];

function Browser({ playSound }) {
    const [activeStory, setActiveStory] = useState(null);

    const openStory = (story) => {
        setActiveStory(story);
        playSound('glass');
    };

    const closeStory = () => {
        setActiveStory(null);
        playSound('click');
    };

    return (
        <div id="browser-root" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', fontFamily: '"Segoe UI", sans-serif', position: 'relative' }}>
            {/* Header / Nav Bar (Aero Glass) */}
            <div className="aero-glass-standard" style={{ padding: '8px 10px', display: 'flex', gap: '10px', alignItems: 'center', zIndex: 10, borderBottom: '1px solid rgba(0,0,0,0.2)' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                    <button className="win7-btn-glass" style={{ width: 32, height: 26, fontSize: '10px' }}>◀</button>
                    <button className="win7-btn-glass" style={{ width: 32, height: 26, fontSize: '10px' }}>▶</button>
                </div>
                <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input 
                        type="text" 
                        value="http://msn.com" 
                        style={{ 
                            width: '100%', 
                            border: '1px solid #a0a0a0', 
                            padding: '4px 30px 4px 10px', 
                            fontSize: '12px', 
                            outline: 'none', 
                            background: 'white',
                            borderRadius: '2px',
                            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)'
                        }} 
                        readOnly 
                    />
                    <div style={{ position: 'absolute', right: 8, color: '#3a7bd5', cursor: 'pointer', fontSize: 12 }}>↻</div>
                </div>
                <button className="win7-btn-glass" style={{ fontWeight: 'bold', padding: '4px 12px' }}>Go</button>
            </div>

            {/* Content Area */}
            <div id="browser-content" style={{ flex: 1, overflowY: 'auto' }}>
                <div style={{ 
                    background: 'linear-gradient(135deg, #1e395b 0%, #3a7bd5 100%)', 
                    padding: '45px 30px', 
                    color: 'white', 
                    position: 'relative', 
                    overflow: 'hidden'
                }}>
                    <div className="glass-reflection" style={{ opacity: 0.4 }}></div>
                    <div style={{ position: 'absolute', top: -50, right: -50, width: 250, height: 250, background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', borderRadius: '50%' }}></div>
                    <h1 style={{ fontSize: 36, fontWeight: 200, margin: 0, position: 'relative', zIndex: 1, textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
                        MSN Portal <span style={{ fontSize: 14, opacity: 0.7, fontWeight: 400, verticalAlign: 'middle', marginLeft: 10 }}>| 2009 Edition</span>
                    </h1>
                    <p style={{ margin: '15px 0 0 0', fontSize: 14, opacity: 0.8, fontWeight: 300 }}>Welcome back, Administrator • October 24, 2009</p>
                </div>

                <div style={{ padding: '30px' }}>
                    <h2 style={{ fontSize: 20, color: '#3a7bd5', borderBottom: '2px solid #3a7bd5', paddingBottom: 10, marginBottom: 25 }}>Top News</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                        {newsStories.map(story => (
                            <div 
                                key={story.id} 
                                className="portfolio-card" 
                                onClick={() => openStory(story)}
                                style={{ cursor: 'pointer' }}
                            >
                                <h3 style={{ margin: '0 0 10px 0', color: '#1e395b', fontSize: 16 }}>{story.title}</h3>
                                <p style={{ fontSize: 13, color: '#555', lineHeight: 1.5, marginBottom: 15 }}>{story.summary}</p>
                                <span style={{ fontSize: 12, fontWeight: 'bold', color: '#3a7bd5' }}>Read more...</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story Reader Overlay */}
            {activeStory && (
                <div id="story-reader" style={{ position: 'absolute', top: 40, left: 0, width: '100%', height: 'calc(100% - 40px)', background: '#fff', zIndex: 100, overflowY: 'auto' }}>
                    <div style={{ padding: '10px', background: '#f8f9fa', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center' }}>
                        <button onClick={closeStory} style={{ padding: '5px 15px', background: '#eee', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer', fontSize: 12 }}>◀ Back to Portal</button>
                    </div>
                    <div id="story-content" style={{ maxWidth: 800, margin: '0 auto', padding: '40px 20px' }}>
                        <h1 style={{ fontSize: 32, color: '#1e395b', marginBottom: 10 }}>{activeStory.title}</h1>
                        <p style={{ fontSize: 14, color: '#888', marginBottom: 30 }}>Published: October 24, 2009 | By MSN News</p>
                        <div style={{ fontSize: 16, color: '#333', lineHeight: 1.8 }}>{activeStory.content}</div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Browser;
