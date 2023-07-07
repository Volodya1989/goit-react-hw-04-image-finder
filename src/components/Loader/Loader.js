import { RotatingLines } from 'react-loader-spinner';
import { RotatingLinesStyled } from './Loader.styled';

const Loader = () => {
  return (
    <RotatingLinesStyled>
      <RotatingLines
        strokeColor="blue"
        margin="auto"
        textAlign="center"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </RotatingLinesStyled>
  );
};
export default Loader;
