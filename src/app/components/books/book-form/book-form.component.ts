import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog } from '@angular/material';
import * as moment from 'moment';

import { Book, Author } from '../../../models';
import { State } from '../../../../custom-types';
import { ApiService, SnackbarService } from '../../../services';
import { minValueValidator, maxValueValidator, isbnValidator } from '../../../directives';
import { AuthorModalComponent } from '../../../modals';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    public dialog: MdDialog,
    public snackbarService: SnackbarService
  ) {}

  state: State = {
    fetching: false,
    error: null,
    bookCoverFile: null,
  };
  @Input()
  book: Book;
  @Output()
  onSave = new EventEmitter<Book>();
  @Output()
  onCancel = new EventEmitter<any>();
  bookForm: FormGroup;
  noBookCover: string = '/assets/images/default.png';
  maxTitleLength: number = 30;
  minReleaseDate: string = '1800-01-01';
  minPublishYear: number = 1800;
  maxPublishYear: number = new Date().getFullYear();
  minPages: number = 1;
  maxPages: number = 10000;

  ngOnInit(): void {
    this.createForm();
  }

  onCancelClick(): void {
    this.onCancel.emit();
  }

  releaseDateFilter = (d: Date): boolean => {
    const date = moment(d);
    const min = moment(this.minReleaseDate).startOf('d');
    const max = moment().endOf('d');
    return date.isBetween(min, max);
  }

  uploadCoverImage(image: File): Promise<string|null> {
    this.state.fetching = true;
    this.state.error = null;
    if (!image) return Promise.resolve(null);
    return this.apiService.uploadFile(image)
      .then(res => res.file.url)
      .catch(this.handleError.bind(this));
  }

  saveBook(): void {
    this.uploadCoverImage(this.state.bookCoverFile)
      .then((coverUrl) => {
        this.book.coverUrl = coverUrl;
        const book = this.prepareBook();
        this.onSave.emit(book);
      })
      .then(this.handleSuccess.bind(this))
      .catch(this.handleError.bind(this));
  }

  addAuthor(): void {
    this.dialog
      .open(AuthorModalComponent)
      .afterClosed()
      .subscribe(this.onAuthorAdd.bind(this));
  }

  onAuthorAdd(author: Author): void {
    if (author) {
      this.bookForm.patchValue({ authors: this.bookForm.value.authors.concat(author) });
    }
  }

  editAuthor(author: Author): void {
    this.dialog
      .open(AuthorModalComponent, { data: author })
      .afterClosed()
      .subscribe(this.onAuthorEdit.bind(this));
  }

  onAuthorEdit(author: Author): void {
    if (author) {
      this.bookForm.patchValue({
        authors: this.bookForm.value.authors.map(a => {
          if (a.id === author.id) return Object.assign({}, author);
          return a;
        }),
      });
    }
  }

  onAuthorRemove(author: Author): void {
    this.bookForm.patchValue({ authors: this.bookForm.value.authors.filter(a => a !== author) });
  }

  onBookCoverChange(event): void {
    const files = event.srcElement.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = e => (this.book.coverUrl = reader.result);
      reader.readAsDataURL(file);
      this.state.bookCoverFile = file;
    }
  }

  onDeleteBookCover(): void {
    this.book.coverUrl = null;
    this.state.bookCoverFile = null;
  }

  createForm(): void {
    this.bookForm = this.fb.group({
      authors: [this.book.authors, [Validators.required]],
      publisher: [this.book.publisher, [Validators.maxLength(this.maxTitleLength)]],
      ISBN: [this.book.ISBN, [Validators.required, isbnValidator()]],
      releaseDate: [new Date(this.book.releaseDate), [Validators.required]],
      title: [
        this.book.title, [
          Validators.required,
          Validators.maxLength(this.maxTitleLength)
        ]
      ],
      year: [
        this.book.year,
        [
          Validators.required,
          minValueValidator(this.minPublishYear),
          maxValueValidator(this.maxPublishYear),
        ],
      ],
      pages: [
        this.book.pages, [
          Validators.required,
          minValueValidator(this.minPages),
          maxValueValidator(this.maxPages)
        ],
      ],
    });
  }

  prepareBook(): Book {
    const formData = this.bookForm.value;
    const authors: Author[] = formData.authors.map((a: Author) => Object.assign({}, a));
    return Object.assign({}, this.book, formData, { authors });
  }

  hasError(control: string, validator: string): boolean {
    return this.bookForm.controls[control].hasError(validator);
  }

  handleSuccess(): void {
    this.state.fetching = false;
    this.state.error = null;
  }

  handleError(errorMsg: string): void {
    this.state.fetching = false;
    this.state.error = errorMsg;
    this.snackbarService.openSnackBar(errorMsg, 1500);
  }
}
