import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { SearchbarStyled, Form, Input, ButtonStyled } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import Notiflix from 'notiflix';

const Searchbar = ({ onSubmit }) => {
  let oldQuery = null;

  const [queryParam, setQueryParam] = useState('');

  const handleOnChange = e => {
    const { value } = e.currentTarget;
    setQueryParam(value);
  };

  const reset = () => {
    setQueryParam('');
  };
  useEffect(() => {
    setQueryParam(queryParam);
  }, [queryParam]);

  const handleOnSubmit = e => {
    e.preventDefault();
    if (queryParam.trim().length === 0) {
      setQueryParam(queryParam);
      return Notiflix.Notify.failure('Please type in some search key word');
    }
    if (oldQuery && oldQuery.trim() === queryParam.trim()) {
      reset();

      return Notiflix.Notify.info(
        'This is the same query that you have already  entered. Please type new one for new results.'
      );
    }
    oldQuery = queryParam.trim();

    onSubmit(queryParam);

    reset();
  };

  return (
    <SearchbarStyled>
      <Form onSubmit={handleOnSubmit}>
        <ButtonStyled type="submit">
          <BsSearch />
        </ButtonStyled>
        <Input
          type="text"
          name="queryParam"
          autocomplete="off"
          value={queryParam}
          onChange={handleOnChange}
          autoFocus
          placeholder="Search images and photos"
        />
      </Form>
    </SearchbarStyled>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
