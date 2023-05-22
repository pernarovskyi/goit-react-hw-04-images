import PropTypes from 'prop-types';
import { LoadMoreButton } from './Button.styled';

export const Button = ({ onLoadMoreClick }) => {
  return (
    <LoadMoreButton type="button" onClick={onLoadMoreClick}>
      Load more
    </LoadMoreButton>
  );
};

Button.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};
