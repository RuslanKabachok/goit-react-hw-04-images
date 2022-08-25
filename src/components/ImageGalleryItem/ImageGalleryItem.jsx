import PropTypes from 'prop-types';
import { ImageGalleryItem, GalleryImage } from './ImageGalleryItem.styled';

export const GalleryItem = ({ mainImg, largeImg, onModal }) => {
  return (
    <ImageGalleryItem>
      <GalleryImage src={mainImg} alt="" onClick={() => onModal(largeImg)} />
    </ImageGalleryItem>
  );
};

GalleryItem.propTypes = {
  mainImg: PropTypes.string.isRequired,
  largeImg: PropTypes.string.isRequired,
  onModal: PropTypes.func.isRequired,
};
