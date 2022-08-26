import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalWindow, BackDrop } from './Modal.styled';

export const Modal = ({ largeImg, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  });

  return (
    <BackDrop onClick={e => closeModal(e)}>
      <ModalWindow>
        <img src={largeImg} alt="" />
      </ModalWindow>
    </BackDrop>
  );
};

Modal.propTypes = {
  largeImg: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
