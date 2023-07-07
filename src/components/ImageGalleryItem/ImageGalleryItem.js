import { Item } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ webformatURL, activeImg, tags, onClick }) => {
  return (
    <Item onClick={e => onClick(e, activeImg)}>
      <img src={webformatURL} alt={tags} />
    </Item>
  );
};
export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  activeImg: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
