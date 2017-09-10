import { Injectable } from '@angular/core';

import { ApiService } from '../api/api.service';
import { Book } from '../../models';

@Injectable()
export class BooksService {
  constructor(private apiService: ApiService) { }

  private baseUrl: string = '/books';

  getBooks(): Promise<Book[]> {
    return this.apiService.get(this.baseUrl);
  }

  getBook(id: String): Promise<Book> {
    const url = `${this.baseUrl}/${id}`;
    return this.apiService.get(url);
  }

  updateBook(book: Book) {
    const url = `${this.baseUrl}/${book.id}`;
    return this.apiService.put(url, book);
  }

  createBook(book: Book) {
    return this.apiService.post(this.baseUrl, book);
  }

  deleteBook(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.apiService.delete(url);
  }
}
