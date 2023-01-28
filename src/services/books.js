import {uniqBy} from 'lodash'
import {books} from '@/books.json'

export const getBookById = bookId => {
  return books.find(book => book.id === bookId) || {}
}

export const getBooksByAuthor = author => {
  return books.filter(book => book.creator === author)
}

export const getAuthors = () => {
  return uniqBy(
    books.map(({creator, authorSort}) => ({
      creator,
      authorSort
    })),
    'authorSort'
  )
}
