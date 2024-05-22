import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmationModal({ show, handleClose, handleConfirm }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>확인창</Modal.Title>
      </Modal.Header>
      <Modal.Body>회원탈퇴를 하시겠습니까?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          취소
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          탈퇴하기
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmationModal;
