import PropTypes from 'prop-types';
import {
  ImageGalleryElement,
  ImageGalleryElementImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, tags, largeImg, onImageClick }) => {
      return (
      <ImageGalleryElement onClick={() => onImageClick(largeImg)}>
        <ImageGalleryElementImage src={src} alt={tags} />
      </ImageGalleryElement>
    );
}

ImageGalleryItem.propTypes = {
  src: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired, 
  largeImg: PropTypes.string.isRequired, 
  onImageClick: PropTypes.func.isRequired,
};