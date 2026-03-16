import React from 'react';

const InternetFlyout = ({ onClose }) => {
  return (
    <div className="internet-flyout win7-glass flyout-container" onClick={(e) => e.stopPropagation()}>
      <div className="internet-flyout-header">
        Currently connected to:
      </div>
      
      <div className="network-list">
        <div className="network-item connected">
          <div className="network-icon">📶</div>
          <div className="network-details">
            <div className="network-name">Frutiger_Link</div>
            <div className="network-status">Connected</div>
          </div>
          <div className="network-signal">✔</div>
        </div>
      </div>
      
      <div className="internet-flyout-body">
        <p className="network-help">Access: Internet</p>
      </div>

      <div className="flyout-footer">
        <span className="footer-link">Open Network and Sharing Center</span>
      </div>
    </div>
  );
};

export default InternetFlyout;
