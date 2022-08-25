import React, { Component } from 'react';
import { GetDataFromAPI } from 'services/Api';
import Wrapper from './App.styled';
import SearchBar from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

class App extends Component {
  state = {
    keyWord: '',
    images: [],
    totalHits: 0,
    page: 1,
    showModal: false,
    largeImage: '',
    loading: false,
    error: null,
  };

  onSearch = e => {
    e.preventDefault();
    this.setState({ keyWord: e.target.elements.search.value });
  };

  onLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  openModal = largeImageItem => {
    this.setState({ showModal: true, largeImage: largeImageItem });
    window.addEventListener('keydown', this.handleKeyPress);
  };

  closeModal = event => {
    if (event.target === event.currentTarget) {
      this.setState({ showModal: false });
    }
  };

  handleKeyPress = e => {
    if (e.code === 'Escape') {
      this.setState({ showModal: false });
      window.removeEventListener('keydown', this.handleKeyPress);
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const searchQuery = this.state.keyWord;
    const page = this.state.page;

    if (prevState.keyWord !== searchQuery) {
      this.setState({ loading: true });
      try {
        const response = await GetDataFromAPI(searchQuery, page);
        this.setState({
          images: [...response.hits],
          totalHits: response.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }

    if (prevState.page !== page) {
      this.setState({ loading: true });
      try {
        const response = await GetDataFromAPI(searchQuery, page);
        this.setState({
          images: [...this.state.images, ...response.hits],
          totalHits: response.totalHits,
        });
      } catch (error) {
        this.setState({ error });
      } finally {
        this.setState({
          loading: false,
        });
      }
    }
  }

  render() {
    return (
      <Wrapper>
        <SearchBar onSubmit={this.onSearch} />
        {this.state.images.length > 0 && (
          <ImageGallery images={this.state.images} openModal={this.openModal} />
        )}
        {this.state.loading && <Loader />}
        {this.state.images.length > 0 && this.state.totalHits > 12 && (
          <Button loadMore={this.onLoadMore} />
        )}
        {this.state.showModal && (
          <Modal
            largeImg={this.state.largeImage}
            closeModal={this.closeModal}
          />
        )}
      </Wrapper>
    );
  }
}

export default App;
