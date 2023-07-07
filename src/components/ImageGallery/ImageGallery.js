import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ data, onClick }) => {
  return (
    <List>
      {data.length > 0 ? (
        data.map(({ id, webformatURL, tags, largeImageURL }) => {
          return (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              activeImg={largeImageURL}
              onClick={onClick}
            />
          );
        })
      ) : (
        <div></div>
      )}
    </List>
  );
};
export default ImageGallery;

ImageGallery.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ),
  onClick: PropTypes.func.isRequired,
};
