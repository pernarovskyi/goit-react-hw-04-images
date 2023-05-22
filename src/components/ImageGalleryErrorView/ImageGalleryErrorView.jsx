import errorImage from './errorImage.jpg';
import { Wrapper, ErrorImage } from './ImageGalleryErrorView.styled';

export const ImageGalleryErrorView = ({ message }) => {
  return (
    <Wrapper role="alert">
      <ErrorImage src={errorImage} alt="error" width="100" />
      <p>{message}</p>
    </Wrapper>
  );
};
