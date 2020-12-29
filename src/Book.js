import React from 'react'

class Book extends React.Component {

  render() {
    const { bookData, onMoveToShelf } = this.props;
    const { title, authors, shelf, imageLinks } = bookData;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${imageLinks && imageLinks.thumbnail})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(event) => onMoveToShelf(bookData, event.target.value)} value={shelf}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        {
          authors && authors.map(author => (
            <div className="book-authors" key={author}>{author}</div>
          ))
        }
      </div>
    )
  }
}

export default Book