// @flow
import React, { Component } from 'react';
import PagerButton from '../PagerButton';
import { Pagination } from '../../types';

type Props = {
  onPagerClick: (direction: string) => void,
  pagination: Pagination,
}

class Pager extends Component {
  props: Props

  handleClick = (direction: string) => this.props.onPagerClick(direction);

  render() {
    const { pagination: { total_pages, page_number } } = this.props;

    return (
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'  }}>
        <div style={{ fontSize: '85%', textAlign: 'center' }}>
          Page {page_number} of {total_pages}
        </div>
        <div style={{ display: 'flex' }}>
          <PagerButton
            direction="prev"
            disabled={page_number === 1}
            onPagerClick={this.handleClick}
          />
          <PagerButton
            direction="next"
            disabled={page_number === total_pages}
            onPagerClick={this.handleClick}
          />
        </div>
      </nav>
    );
  }
}

export default Pager;
