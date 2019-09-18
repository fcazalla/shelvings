import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Shelving } from '../../models/shelving';
import { DataService } from '../../services/data.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service';
import { Book } from '../../models/book';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-shelving-detail',
  templateUrl: './shelving-detail.component.html',
  styleUrls: ['./shelving-detail.component.sass']
})
export class ShelvingDetailComponent implements OnInit {
  actionToDo: string;
  fieldsAsReadOnly = false;
  shelvingForm: FormGroup;
  books: Book[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private data: DataService,
    private formValidationService: FormValidationService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const shelvingId = this.activatedRoute.snapshot.paramMap.get('shelvingId');
    if ('new' === shelvingId) {
      this.createForm();
      this.actionToDo = 'Nueva estantería';
    } else {
      this.actionToDo = 'Editando estantería';
      this.fieldsAsReadOnly = true;
      this.createForm(this.data.getShelving(shelvingId));
      this.books = this.data.getBooksByShelving(shelvingId);
    }
  }

  createForm(shelving: Shelving = new Shelving()) {
    this.shelvingForm = this.formBuilder.group({
      id: [shelving.id],
      name: [shelving.name, Validators.required],
      shelfs: [shelving.shelfs ? shelving.shelfs.length : '', Validators.required],
      width: [shelving.width, Validators.required]
    });
  }

  onSubmit() {
    if (this.shelvingForm.invalid) {
      this.formValidationService.validateFormFields(this.shelvingForm);
      return;
    }

    if (this.data.addShelving(this.shelvingForm.value)) {
      this.toastr.success('Librería guardada correctamente', '', {
        progressBar: true,
        closeButton: true,
        timeOut: 3500
      });
      this.router.navigate(['/shelvings']);
    }
  }
}
