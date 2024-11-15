import React, { useState, useEffect } from 'react';

const SuccessPopup = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Hide popup after 3 seconds
      }, 3000);
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [show, onClose]);

  return (
    <div className={`popup ${show ? 'show' : ''}`}>
      <p>{message}</p>
    </div>
  );
};

export default SuccessPopup;
