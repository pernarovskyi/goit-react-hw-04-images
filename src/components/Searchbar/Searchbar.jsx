import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';

export function Searchbar({ onSubmit }) {
  const [searchString, setSearchString] = useState('');

  const handleInputChange = e => {
    setSearchString(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchString.trim() === '') {
      toast.error('Nothing to search', { autoClose: 1500 });
      return;
    }
    onSubmit(searchString);
    setSearchString('');
  };

  return (
    <Header>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchString}
          onChange={handleInputChange}
        />
      </SearchForm>
    </Header>
  );
}
