import PropTypes from 'prop-types';
import { ModalWindow, BackDrop } from './Modal.styled';

export const Modal = ({ largeImg, closeModal }) => {
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
