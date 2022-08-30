import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa';
import {
  MainHeader,
  Input,
  SearchForm,
  SearchBtn,
  SearchLabel,
} from './SearchBar.styled';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = e => {
    setInputValue(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <MainHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchBtn type="submit">
          <FaSearch size={20} />
          <SearchLabel>Search</SearchLabel>
        </SearchBtn>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          value={inputValue}
          name="search"
        />
      </SearchForm>
    </MainHeader>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default SearchBar;
