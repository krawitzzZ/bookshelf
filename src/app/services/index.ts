import { ApiService } from './api/api.service';
import { BooksService } from './books/books.service';
import { SnackbarService } from './snackbar/snackbar.service';

export const ServicesProvider = [
  ApiService,
  BooksService,
  SnackbarService,
];

export {
  ApiService,
  BooksService,
  SnackbarService,
};
