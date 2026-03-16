import React, { useState, useEffect } from 'react';

const ClockFlyout = ({ onClose }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = time.getFullYear();
  const month = time.getMonth();
  const date = time.getDate();

  const days = [];
  const startDay = firstDayOfMonth(year, month);
  const totalDays = daysInMonth(year, month);

  // Pad empty days at the start
  for (let i = 0; i < startDay; i++) {
    days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
  }

  // Fill actual days
  for (let d = 1; d <= totalDays; d++) {
    days.push(
      <div key={d} className={`calendar-day ${d === date ? 'current' : ''}`}>
        {d}
      </div>
    );
  }

  return (
    <div className="clock-flyout win7-glass flyout-container" onClick={(e) => e.stopPropagation()}>
      <div className="clock-flyout-header">
        <div className="analog-clock">
          <div className="hand hour-hand" style={{ transform: `rotate(${(time.getHours() % 12) * 30 + time.getMinutes() / 2}deg)` }}></div>
          <div className="hand minute-hand" style={{ transform: `rotate(${time.getMinutes() * 6}deg)` }}></div>
          <div className="hand second-hand" style={{ transform: `rotate(${time.getSeconds() * 6}deg)` }}></div>
          <div className="clock-center"></div>
        </div>
        <div className="digital-time-large">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </div>
        <div className="date-large">
          {time.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>
      
      <div className="calendar-section">
        <div className="calendar-header">
          {monthNames[month]} {year}
        </div>
        <div className="calendar-grid">
          {dayNames.map(day => <div key={day} className="calendar-day-header">{day}</div>)}
          {days}
        </div>
      </div>
      
      <div className="flyout-footer">
        <span className="footer-link">Change date and time settings...</span>
      </div>
    </div>
  );
};

export default ClockFlyout;
