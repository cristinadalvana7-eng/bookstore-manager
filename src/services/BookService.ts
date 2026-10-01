import { BookRepository } from "../repositories/BookRepository";
import { BookData } from "../models/Book";

export class BookService {
  private readonly bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async create(book: BookData): Promise<void> {
    if (!book.title.trim()) {
      throw new Error("O título do livro é obrigatório.");
    }

    await this.bookRepository.create(book);
  }

  async findAll(): Promise<BookData[]> {
    return this.bookRepository.findAll();
  }
}