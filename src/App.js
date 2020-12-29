import React from 'react'
import { Route } from 'react-router-dom'

import './App.css'
import MyReads from './MyReads'
import BookSearch from './BookSearch'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/'>
          <MyReads />
        </Route>
        <Route path='/search'>
          <BookSearch />
        </Route>
      </div>
    )
  }
}

export default BooksApp
