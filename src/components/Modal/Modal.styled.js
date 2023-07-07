import styled from '@emotion/styled';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  margin-bottom: 2%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
`;

export const ModalStyled = styled.div`
  position: relative;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 24px);
`;
export const ModalImg = styled.img`
  positon: relative;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  right: -22px;
  cursor: pointer;
  border: none;
  width: 24px;
  height: 24px;
  text-align: center;
  line-height: 0;
  color: white;
  font-size: 30px;
  font-weight: 700;

  background-color: transparent;

  &:hover,
  &:focus {
    color: white;
  }
`;
