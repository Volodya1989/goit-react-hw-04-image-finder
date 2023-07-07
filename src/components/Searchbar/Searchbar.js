import { Component } from 'react';
import PropTypes from 'prop-types';

import { SearchbarStyled, Form, Input, ButtonStyled } from './Searchbar.styled';
import { BsSearch } from 'react-icons/bs';
import Notiflix from 'notiflix';

class Searchbar extends Component {
  static oldQuery = null;
  state = {
    queryParam: ''.trim(),
  };

  handleOnChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({
      [name]: value,
    });
  };

  reset = () => {
    this.setState({ queryParam: '' });
  };
  componentDidUpdate(_, prevState) {
    const { queryParam } = this.state;
    if (prevState.queryParam.trim() !== queryParam.trim()) {
      this.setState({
        queryParam: queryParam.trim(),
      });
    }
  }

  handleOnSubmit = e => {
    const { queryParam } = this.state;
    e.preventDefault();
    if (queryParam.trim().length === 0) {
      this.setState({
        queryParam: queryParam.trim(),
      });
      return Notiflix.Notify.failure('Please type in some search key word');
    }
    if (this.oldQuery && this.oldQuery.trim() === queryParam.trim()) {
      this.reset();

      return Notiflix.Notify.info(
        'This is the same query that you have already  entered. Please type new one for new results.'
      );
    }
    this.oldQuery = queryParam.trim();


    this.props.onSubmit(queryParam);

    this.reset();
  };

  render() {
    return (
      <SearchbarStyled>
        <Form onSubmit={this.handleOnSubmit}>
          <ButtonStyled type="submit">
            <BsSearch />
          </ButtonStyled>
          <Input
            type="text"
            name="queryParam"
            autocomplete="off"
            value={this.state.queryParam}
            onChange={this.handleOnChange}
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </SearchbarStyled>
    );
  }
}
export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
