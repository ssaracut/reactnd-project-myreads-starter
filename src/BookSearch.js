import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends React.Component {

  state = {
    query: '',
    booksQuery: [],
    myReads: []
  }

  updateSearchValue = async (query) => {
    const queryResponse = query && await BooksAPI.search(query.trim());
    if (Array.isArray(queryResponse)) {
      this.setState({ query, booksQuery: queryResponse })
    } else {
      this.setState({ query, booksQuery: [] });
    }
  }

  moveToBookShelf = async (book, shelf) => {
    try {
      const updateResponse = await BooksAPI.update(book, shelf);

      //if the service errors out it will return a string vs object
      //don't do anything if there is an error -> ideally should display on screen
      if (typeof updateResponse !== 'string') {
        if (shelf !== 'none') {
          // spread myReads and add/update the book to myReads with the shelf selected
          this.setState((oldState) => ({
            myReads: { ...oldState.myReads, [book.id]: { ...book, shelf } }
          }))
        } else {
          this.setState((oldState) => ({
            // spread myReads and delete the book selected (when shelf is none)
            myReads: delete { ...oldState.myReads }[book.id]
          }))
        }
      }
    } catch (error) {
      console.error('Failed to update bookshelf.');
    }
  }

  overlayMyReads(book) {
    // assigning a bookshelf to the book depending on the books in myReads
    return this.state.myReads[book.id] ? this.state.myReads[book.id] : { ...book, shelf: 'none' };
  }

  async componentDidMount() {
    const myReads = await BooksAPI.getAll();
    // reduce myReads from array into object with book ids for keys { bookid: book }
    this.setState({ myReads: myReads.reduce((map, book) => ({ ...map, [book.id]: { ...book } }), {}) })
  }

  render() {
    const { query, booksQuery } = this.state;
    return (
      <div className="app">
        <div className="search-books">
          <div className="search-books-bar">
            <Link to='/'>
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
              <input type="text" placeholder="Search by title or author" onChange={(e) => { this.updateSearchValue(e.target.value) }} value={query} />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {
                booksQuery.map(book => (
                  <Book key={book.id} bookData={this.overlayMyReads(book)} onMoveToShelf={this.moveToBookShelf} />
                ))
              }
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default BookSearch
