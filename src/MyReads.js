import React from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import Book from './Book'

class MyReads extends React.Component {

  state = {
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  moveBookToShelf = async (book, newShelf) => {
    try {
      const currentShelf = book.shelf;
      const updateResponse = await BooksAPI.update(book, newShelf);

      //if the service errors out it will return a string vs object
      //don't do anything if there is an error -> ideally should display on screen
      if (typeof updateResponse !== 'string') {
        this.setState(oldState => ({
          ...oldState,
          // removing the book from the current shelf
          [currentShelf]: oldState[currentShelf].filter(b => b.id !== book.id),
          // if the book shelf selected was not 'none', then add it to the new shelf
          ...(newShelf !== 'none') &&
          { [newShelf]: [...oldState[newShelf], { ...book, shelf: newShelf }] }
        }))
      }
    } catch {
      console.error('Failed to update bookshelf.');
    }
  }

  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({
      currentlyReading: books.filter(book => book.shelf === 'currentlyReading'),
      wantToRead: books.filter(book => book.shelf === 'wantToRead'),
      read: books.filter(book => book.shelf === 'read')
    })
  }

  render() {
    return (
      <div className="app">

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf title={'Currently Reading'}>
              {
                this.state.currentlyReading.map(book => (<Book key={book.id} bookData={book} onMoveToShelf={this.moveBookToShelf} />))
              }
            </BookShelf>
            <BookShelf title={'Want to Read'} >
              {
                this.state.wantToRead.map(book => (<Book key={book.id} bookData={book} onMoveToShelf={this.moveBookToShelf} />))
              }
            </BookShelf>
            <BookShelf title={'Read'} >
              {
                this.state.read.map(book => (<Book key={book.id} bookData={book} onMoveToShelf={this.moveBookToShelf} />))
              }
            </BookShelf>
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    )
  }
}

export default MyReads
