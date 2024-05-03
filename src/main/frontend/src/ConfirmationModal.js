//회원 탈퇴 선택 시 회원 탈퇴가 확실한지 여부 확인 체크
import React from 'react';

function ConfirmationModal({ show, handleClose, handleConfirm }) {
  return (
    <div className={show ? "confirmation-modal" : "confirmation-modal hidden"}>
      <p>정말로 회원을 탈퇴하시겠습니까?</p>
      <button onClick={handleConfirm}>확인</button>
      <button onClick={handleClose}>취소</button>
    </div>
  );
}

export default ConfirmationModal;
