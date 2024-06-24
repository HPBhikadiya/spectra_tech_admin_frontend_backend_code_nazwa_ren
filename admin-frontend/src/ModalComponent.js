// src/ModalComponent.js
import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ModalComponent = ({ isOpen, onRequestClose, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Details Modal"
    >
      <h2>Details</h2>
      <button onClick={onRequestClose}>Close</button>
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </Modal>
  );
};

export default ModalComponent;
