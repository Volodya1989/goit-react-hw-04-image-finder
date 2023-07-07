import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import getPictures from '../../api/API';
import Button from 'components/Button';
import ImageGallery from 'components/ImageGallery';
import Loader from 'components/Loader';
import Modal from 'components/Modal';
import Notiflix from 'notiflix';
import Searchbar from 'components/Searchbar';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [pageCounter, setPageCounter] = useState(() => 1);
  const [query, setQuery] = useState('');
  const [activeImg, setActiveImg] = useState('');
  const [isShowModal, setIsShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (query === '') {
      return;
    }
    onGettingImages(query, pageCounter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCounter, query]);

  const onGettingImages = async (queryParam, pageCounter) => {
    try {
      setIsLoading(true);

      const response = await getPictures(queryParam, pageCounter);
      const { hits, totalHits } = await response.data;

      setIsLoading(false);
      setPictures(prevPictures => [...prevPictures, ...hits]);
      setIsLoadMore(pageCounter < Math.ceil(Number(totalHits) / 12));

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
        if (!isLoadMore && pageCounter > 1) {
          Notiflix.Notify.info(
            `There are no more additonal images with this query...`
          );
        }
      }, 500);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmit = query => {
    setQuery(query);
    setPictures([]);
    setPageCounter(1);
  };

  const onLoadMore = () => {
    setPageCounter(prevCounter => prevCounter + 1);
  };

  const toggleModal = () => {
    setIsShowModal(prevIsShowModal => !prevIsShowModal);
  };

  const onClick = (_, img) => {
    setActiveImg(img);
    toggleModal();
  };

  return (
    <Container>
      <Searchbar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      <ImageGallery data={pictures} onClick={onClick} />
      {isLoadMore && <Button onLoad={onLoadMore} />}

      {isShowModal && <Modal activeImg={activeImg} onClose={toggleModal} />}
    </Container>
  );
};

export default App;
