import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import { IoMdClose } from "react-icons/io";
import '../styles/userIconModal.css';
import { UserContext } from '../contexts/userContext'; // Use context directly

const UserIcon = () => {
  const { currentUser } = useContext(UserContext); // Access currentUser from context
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClick = () => {
    if (currentUser) {
      navigate('/profile'); // Redirect to profile page
    } else {
      setShowLoginModal(true); // Open login modal
    }
  };

  const closeModal = () => {
    setShowLoginModal(false); // Close the modal
  };

  return (
    <>
      <button onClick={handleClick} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <img
          src="../assets/user.png"
          alt="User Icon"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
        />
      </button>

      {showLoginModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
               <IoMdClose />
            </button>
            <Login onLoginSuccess={closeModal} />
          </div>
        </div>
      )}
    </>
  );
};

export default UserIcon;
