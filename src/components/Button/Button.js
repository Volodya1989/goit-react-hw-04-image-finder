import { ButtonStyled } from './Button.styled';
import PropTypes from 'prop-types';

const Button = ({ onLoad }) => {
  return (
    <ButtonStyled type="button" onClick={onLoad}>
      Load more
    </ButtonStyled>
  );
};
export default Button;

Button.propTypes = {
  onLoad: PropTypes.func.isRequired,
};
