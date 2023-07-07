import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled, CloseBtn, ModalImg } from './Modal.styled';
const modalRootEl = document.querySelector('#modal-root');

const Modal = ({ onClose, activeImg }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalStyled>
        <ModalImg className="modalImg" src={activeImg} alt="large image" />
        <CloseBtn type="button" onClick={() => onClose()}>
          &times;
        </CloseBtn>
      </ModalStyled>
    </Overlay>,
    modalRootEl
  );
};

export default Modal;

Modal.propTypes = {
  activeImg: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
