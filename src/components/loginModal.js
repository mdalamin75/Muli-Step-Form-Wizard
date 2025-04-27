import React from 'react';
import Login from './login';
import '../styles/modal.css';

const LoginModal = ({ onClose }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-button" onClick={onClose}>×</button>
      <Login onLogin={onClose} /> {/* Pass onClose to close modal on successful login */}
    </div>
  </div>
);

export default LoginModal;
