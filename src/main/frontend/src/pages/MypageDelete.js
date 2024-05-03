import React, { useState } from 'react';
import axios from 'axios';
import ConfirmationModal from '../ConfirmationModal';
import { useNavigate } from 'react-router-dom';

function MyPageDelete() {
  const [showModal, setShowModal] = useState(false);
  const history = useNavigate();

  const handleDeleteUser = () => {
    axios.delete('/api/user/delete')
      .then(response => {
        console.log('User deleted successfully');
        history.push('/');
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  const handleConfirmDelete = () => {
    handleDeleteUser();
    setShowModal(false);
  };

  return (
    <div>
      <h2>회원 탈퇴</h2>
      <button onClick={() => setShowModal(true)}>회원 탈퇴</button>
      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default MyPageDelete;
