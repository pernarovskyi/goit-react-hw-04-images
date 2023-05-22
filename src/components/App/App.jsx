import { Searchbar } from 'components/Searchbar';
import { Button } from 'components/Button';
import { ImageGalleryErrorView } from 'components/ImageGalleryErrorView';
import { Loader } from 'components/Loader';
import { ToastContainer } from 'react-toastify';
import { Component } from 'react';
import { Modal } from 'components/Modal';
import { Container } from './App.styled';
import { ImageGallery } from 'components/ImageGallery';
import { getPictures } from 'services/getApi';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    largeImgURL: '',
    showModal: false,
    searchText: '',
    page: 1,
    status: 'idle',
    pictures: [],
    error: '',
    loadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const prevSearch = prevState.searchText;
    const nextSearch = this.state.searchText;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearch !== nextSearch || prevPage !== nextPage) {
      this.setState({
        status: 'pending',
        error: '',
      });

      getPictures(nextSearch, nextPage)
        .then(({ totalHits, hits }) => {
          if (hits.length < 1) {
            this.setState({
              loadMore: false,
              status: 'idle',
            });
            return this.setState({
              status: 'rejected',
              error: {
                message: 'No matches found.',
              },
            });
          }

          const images = hits.map(
            ({ id, largeImageURL, tags, webformatURL }) => {            
              return { totalHits, id, largeImageURL, tags, webformatURL };
            }
          );

          this.setState(prevState => {
            return {
              pictures: [...prevState.pictures, ...images],
            };
          });

          this.setState({
            status: 'resolved',
            loadMore:
              this.state.page < Math.ceil(totalHits / 12) ? true : false,
          });
        })
        .catch(error =>
          this.setState({ error: error.message, status: 'rejected' })
        );
    }
  }

  handleFormSubmit = newSearchText => {
    if (newSearchText === this.state.searchText) {
      return;
    }
    this.setState({
      pictures: [],
      searchText: newSearchText,
      page: 1,
      status: 'idle',
      loadMore: false,
      showModal: false,
    });
  };

  handleLargeImageUrl = url => {
    this.setState({
      largeImgURL: url,
    });
    this.toggleModal();
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { pictures, largeImgURL, showModal, status, error, loadMore } =
      this.state;

    return (
      <Container>
        {showModal && <Modal imgUrl={largeImgURL} onClose={this.toggleModal} />}

        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === 'idle' && (
          <h1 style={{ textAlign: 'center' }}>
            Share with some ideas to search pictures on Pixabay
          </h1>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && (
          <ImageGalleryErrorView message={error.message} />
        )}
        {pictures.length > 0 && (
          <ImageGallery
            pictures={pictures}
            onImageClick={this.handleLargeImageUrl}
          />
        )}
        {loadMore && <Button onLoadMoreClick={this.handleLoadMore} />}
        <ToastContainer />
      </Container>
    );
  }
}