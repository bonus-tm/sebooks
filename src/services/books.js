import {uniqBy} from 'lodash'
import {authors, books, series, sets, updatedAt} from '@/books.json'

export const booksCount = books.length

const date = new Date(updatedAt)
export const updated = date.toJSON().substring(0, 10)

export const getFirstBook = () => books[0]

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
