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
  return (
    <MainHeader>
      <SearchForm onSubmit={onSubmit}>
        <SearchBtn type="submit">
          <FaSearch size={20} />
          <SearchLabel>Search</SearchLabel>
        </SearchBtn>
        <Input
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
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
