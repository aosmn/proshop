import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const pagesList = [];
  for (let p = 1; p <= pages; p++) {
    pagesList.push(
      <LinkContainer
        key={p}
        to={
          isAdmin
            ? `/admin/productlist/${p}`
            : keyword
            ? `/search/${keyword}/page/${p}`
            : `/page/${p}`
        }>
        <Pagination.Item active={p === page}>{p}</Pagination.Item>
      </LinkContainer>
    );
  }

  return pages > 1 && <Pagination>{pagesList}</Pagination>;
};

export default Paginate;
