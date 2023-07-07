import { Component } from 'react';
import { Container } from './App.styled';
import getPictures from '../../api/API';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import Notiflix from 'notiflix';

import Searchbar from 'components/Searchbar';
export class App extends Component {
  state = {
    pictures: [],
    pageCounter: 1,
    query: '',
    activeImg: '',
    isShowModal: false,
    isLoading: false,
    isLoadMore: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, pageCounter } = this.state;
    if (prevState.query !== query || prevState.pageCounter !== pageCounter) {
      this.onGettingImages(query, pageCounter, query);
    }
  }

  async onGettingImages(queryParam, pageCounter) {
    try {
      this.setState({ isLoading: true });
      const response = await getPictures(queryParam, pageCounter);
      const { hits, totalHits } = await response.data;
      this.setState({ isLoading: false });

      this.setState(({ pictures }) => {
        return {
          pictures: [...pictures, ...hits],
        };
      });
      this.setState({
        isLoadMore: pageCounter < Math.ceil(Number(totalHits) / 12),
      });
      if (totalHits !== 0 && pageCounter === 1) {
        Notiflix.Notify.success(
          `We have found ${totalHits} images for you to see!`
        );
      }

      if (hits.length === 0) {
        Notiflix.Notify.failure(
          `Images were not found with your query. Please try again!`
        );
      }

      setTimeout(() => {
        if (!this.state.isLoadMore && pageCounter > 1) {
          Notiflix.Notify.info(
            `There are no more additonal images with this query...`
          );
        }
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }
  onSubmit = query => {
    this.setState({ query: query.trim(), pictures: [], pageCounter: 1 });
  };
  onLoadMore = () => {
    this.setState(({ pageCounter }) => {
      return { pageCounter: pageCounter + 1 };
    });
  };
  toggleModal = () => {
    this.setState(({ isShowModal }) => ({
      isShowModal: !isShowModal,
    }));
  };

  onClick = (_, img) => {
    this.setState({
      activeImg: img,
    });

    this.toggleModal();
  };

  render() {
    const { pictures, isShowModal, activeImg, isLoading, isLoadMore } =
      this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSubmit} />
        {isLoading && <Loader />}
        <ImageGallery data={pictures} onClick={this.onClick} />
        {isLoadMore && <Button onLoad={this.onLoadMore} />}

        {isShowModal && (
          <Modal activeImg={activeImg} onClose={this.toggleModal} />
        )}
      </Container>
    );
  }
}

export default App;
