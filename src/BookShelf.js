import React from 'react'

class BookShelf extends React.Component {
  render() {
    const { children, title } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">            
            {
              React.Children.toArray(children).map(Book=>(
                <li key={Book.props.bookData.id}>
                  {Book}
                </li>
              ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf