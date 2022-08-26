import { useState, useEffect } from 'react';
import { GetDataFromAPI } from 'services/Api';
import Wrapper from './App.styled';
import SearchBar from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

const App = () => {
  const [keyWord, setKeyWord] = useState('');
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(0);
  const [page, setPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = searchQuery => {
    setKeyWord(searchQuery);
    setPage(1);
  };

  const openModal = largeImageItem => {
    setShowModal(true);
    setLargeImage(largeImageItem);
  };

  const closeModal = event => {
    if (event.target === event.currentTarget || event.code === 'Escape') {
      setShowModal(false);
      setLargeImage('');
    }
  };

  const onLoadMore = () => {
    setPage(page => page + 1);
  };

  const getDataforState = data => {
    const dataForState = data.map(elem => {
      return {
        id: elem.id,
        webformatURL: elem.webformatURL,
        largeImageURL: elem.largeImageURL,
      };
    });
    return dataForState;
  };

  useEffect(() => {
    async function fetchData() {
      if (keyWord !== '') {
        setLoading(true);

        try {
          const response = await GetDataFromAPI(keyWord, page);
          const result = getDataforState(response.hits);
          setImages(images => {
            return page === 1 ? [...result] : [...images, ...result];
          });
          setTotalHits(response.totalHits);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    }
    fetchData();
  }, [keyWord, page]);

  return (
    <Wrapper>
      <SearchBar
        onSubmit={searchQuery => {
          onSearch(searchQuery);
        }}
      />
      {error && <p>Whoops, something went wrong: {error.message}</p>}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {loading && <Loader />}
      {images.length > 0 && totalHits > 12 && <Button loadMore={onLoadMore} />}
      {showModal && <Modal largeImg={largeImage} closeModal={closeModal} />}
    </Wrapper>
  );
};

export default App;
