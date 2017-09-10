import { Author } from './author';

export class Book {
  id: string;
  title: string;
  authors: Array<Author>;
  pages: number;
  publisher: string;
  year: number;
  releaseDate: Date;
  ISBN: string;
  coverUrl: string | null;
}
