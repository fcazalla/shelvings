import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../../models/book';
import { DataService } from '../../services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.sass']
})
export class BookDetailComponent implements OnInit {
  actionToDo: string;
  fieldsAsReadOnly = false;
  bookForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formValidationService: FormValidationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  createForm(book: Book = new Book()) {
    this.bookForm = this.formBuilder.group({
      id: [book.id],
      title: [book.title, Validators.required],
      author: [book.author],
      width: [book.width, Validators.required]
    });
  }

  ngOnInit() {
    const bookId = this.activatedRoute.snapshot.paramMap.get('bookId');
    if ('new' === bookId) {
      this.createForm();
      this.actionToDo = 'Nuevo libro';
    } else {
      this.actionToDo = 'Editando libro';
      this.fieldsAsReadOnly = true;
      this.createForm(this.data.getBook(bookId));
    }
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      this.formValidationService.validateFormFields(this.bookForm);
      return;
    }

    const addedBook = this.data.addBook(this.bookForm.value);
    if (addedBook) {
      this.toastr.success('Libro guardado correctamente', '', {
        progressBar: true
      });
      this.router.navigate(['/books']);
    }
  }
}
