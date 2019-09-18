import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Shelving } from '../models/shelving';
import { Shelf } from '../models/shelf';
import { BookPosition } from '../models/bookPosition';
import { ToastrService} from 'ngx-toastr';
import {max} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  books: Book[] = [];
  shelvings: Shelving[] = [];
  constructor(
    private toastr: ToastrService
  ) { }

  getBooks() {
    return this.books;
  }

  getBook(bookId) {
    return this.books[bookId];
  }

  getBooksByShelving(shelvingId) {
    const allBooks = this.getBooks();
    const booksToReturn = [];
    for (const book of allBooks) {
      const position = book.position;
      if (position.shelving.id === parseInt(shelvingId, 10)) {
        booksToReturn.push(book);
      }
    }


    return booksToReturn;
  }

  addBook(bookData) {
    const book = new Book();
    const position = this.getPosition(bookData.width);
    let addedBook = false;
    if (Object.keys(position).length !== 0) {
      book.id = bookData.id !== null ? bookData.id : this.books.length;
      book.title = bookData.title;
      book.author = bookData.author;
      book.width = bookData.width;
      book.position = position;
      this.books[book.id] = book;
      addedBook = true;
    }
    return addedBook;
  }

  getPosition(bookWidth) {
    const bookPosition = new BookPosition();
    const maxWidth = this.getMaxShelvingWidth();
    let positionObtained = false;
    if (bookWidth <= maxWidth) {
      for (const shelving of this.shelvings) {
        if (shelving.shelfs.length > 0) {
          for (const shelf of shelving.shelfs) {
            if (!shelf.complete && (shelf.filledSpace + bookWidth <= shelving.width)) {
              positionObtained = true;
              shelf.filledSpace += bookWidth;
              if (shelf.filledSpace === shelving.width) {
                shelf.complete = true;
              }

              bookPosition.shelving = shelving;
              bookPosition.shelf = shelf;
              break;
            }
          }
        }

        if (positionObtained) {
          break;
        }
      }

      if (!positionObtained) {
        this.toastr.info('El libro no se ha podido guardar, no existe espacio suficiente en sus estanterías', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 3500
        });
      }
    } else {
      if (0 !== maxWidth) {
        this.toastr.info('El libro que intenta guardar tiene un ancho mayor al de las estanterías', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 3500
        });
      } else {
        this.toastr.info('El libro no se ha podido guardar, no existen estanterías', '', {
          progressBar: true,
          closeButton: true,
          timeOut: 3500
        });
      }
    }

    return bookPosition;
  }

  getShelvings() {
    return this.shelvings;
  }

  getShelving(shelvingId) {
    return this.shelvings[shelvingId];
  }

  getMaxShelvingWidth() {
    let maxWidth = 0;
    for (const shelving of this.shelvings) {
      maxWidth = maxWidth < shelving.width ? shelving.width : maxWidth;
    }

    return maxWidth;
  }

  addShelving(shelvingData) {
    let addedShelving = false;
    const shelving = new Shelving();
    const shelfs = Array.from({length: shelvingData.shelfs}, (_, shelfNumber) => new Shelf(shelfNumber, 0));
    shelving.id = shelvingData.id !== null ? shelvingData.id : this.shelvings.length;
    shelving.name = shelvingData.name;
    shelving.width = shelvingData.width;
    shelving.shelfs = shelfs;

    this.shelvings[shelving.id] = shelving;
    if (shelving.id in this.shelvings) {
      addedShelving = true;
    } else {
      this.toastr.error('No se ha podido guardar la librería correctamente', '', {
        progressBar: true,
        closeButton: true,
        timeOut: 3500
      });
    }
    return addedShelving;
  }
}
