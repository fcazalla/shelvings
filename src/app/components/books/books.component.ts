import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { DataService } from '../../services/data.service';
import { Shelving } from '../../models/shelving';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  shelvings: Shelving[] = [];
  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.getBooks();
    this.getShelvings();
  }

  getBooks() {
    this.books = this.data.getBooks();
  }

  getShelvings() {
    this.shelvings = this.data.getShelvings();
  }

  getPosition(position) {
    return position.shelving.name + ' estante ' + position.shelf.id;
  }

}
