import React from 'react';

function Pizzatron() {
    return (
        <div style={{ width: '100%', height: '100%', background: '#000', overflow: 'hidden' }}>
            <iframe 
                src="/apps/pizzatron/index.html" 
                title="Pizzatron"
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    border: 'none',
                    backgroundColor: '#000'
                }}
            />
        </div>
    );
}

export default Pizzatron;
