import { useEffect } from 'react';
import { Searchbar } from 'components/Searchbar';
import { Button } from 'components/Button';
import { ImageGalleryErrorView } from 'components/ImageGalleryErrorView';
import { Loader } from 'components/Loader';
import { ToastContainer } from 'react-toastify';
import { Modal } from 'components/Modal';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery';
import { getPictures } from 'services/getApi';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejecte',
};

export function App() {
  const [pictures, setPictures] = useState([]);
  const [largeImgURL, setLargeImgURL] = useState('');
  const [showModal, setModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState([]);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (!searchText) {
      return;
    }
    try {
      setStatus(Status.PENDING);
      getPictures(searchText, page).then(({ totalHits, hits }) => {
        if (hits.length < 1) {
          setStatus(Status.REJECTED);
          setError({ message: 'No matches found' });
          return;
        }
        const images = hits.map(({ id, largeImageURL, tags, webformatURL }) => {
          return { totalHits, id, largeImageURL, tags, webformatURL };
        });
        setPictures(state => [...state, ...images]);
        if (totalHits > 12) {
          setLoadMore(true);
        }
        setStatus(Status.RESOLVED);
      });
    } catch (error) {
      setError(error.message);
      setStatus(Status.REJECTED);
    }
  }, [page, searchText]);

  const handleFormSubmit = newSearchText => {
    if (newSearchText === searchText) {
      return;
    }

    setPictures([]);
    setSearchText(newSearchText);
    setPage(1);
    setModal(false);
    setLoadMore(false);
    setStatus(Status.IDLE);
  };
  const handleLargeImageUrl = url => {
    setLargeImgURL(url);
    toggleModal();
  };
  const toggleModal = () => {
    setModal(!showModal);
  };
  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <Container>
      {showModal && <Modal imgUrl={largeImgURL} onClose={toggleModal} />}

      <Searchbar onSubmit={handleFormSubmit} />
      {status === Status.IDLE && (
        <h1 style={{ textAlign: 'center' }}>
          Share with some ideas to search pictures on Pixabay
        </h1>
      )}
      {status === Status.PENDING && <Loader />}
      {status === Status.REJECTED && (
        <ImageGalleryErrorView message={error.message} />
      )}
      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} onImageClick={handleLargeImageUrl} />
      )}
      {loadMore && <Button onLoadMoreClick={handleLoadMore} />}
      <ToastContainer />
    </Container>
  );
}