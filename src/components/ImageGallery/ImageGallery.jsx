import PropTypes from 'prop-types';
import { GalleryList } from './ImageGallery.styled';
import { GalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, openModal }) => {
  return (
    <GalleryList>
      {images.map(item => (
        <GalleryItem
          key={item.id}
          onModal={openModal}
          mainImg={item.webformatURL}
          largeImg={item.largeImageURL}
        ></GalleryItem>
      ))}
    </GalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
  openModal: PropTypes.func.isRequired,
};
