import React from 'react'


class BookSearchResults extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className="search-books-results">
        <ol className="books-grid">
          {
            React.Children.toArray(children).map(Book => (
              <li key={Book.props.bookData.id}>
                {Book}
              </li>
            ))
          }
        </ol>
      </div>
    )
  }
}

export default BookSearchResults