import { BookRepository } from "../repositories/BookRepository";
import { BookData } from "../models/Book";
import { AuthorRepository } from "../repositories/AuthorRepository";

export class BookService {
  private readonly bookRepository: BookRepository;
  private readonly authorRepository: AuthorRepository;

  constructor() {
    this.bookRepository = new BookRepository();
    this.authorRepository = new AuthorRepository();
  }

  async create(book: BookData): Promise<void> {
    if (!book.title.trim()) {
      throw new Error("O título do livro é obrigatório.");
    }

    const author = await this.authorRepository.findById(book.authorId);

    if (!author) {
      throw new Error("Autor não encontrado.");
    }

    await this.bookRepository.create(book);
  }

  async findAll(): Promise<BookData[]> {
    return this.bookRepository.findAll();
  }

  async update(book: BookData): Promise<void> {
    if (!book.title.trim()) {
      throw new Error("O título do livro é obrigatório.");
    }

    const existingBook = await this.bookRepository.findById(book.id);

    if (!existingBook) {
      throw new Error("Livro não encontrado.");
    }

    const author = await this.authorRepository.findById(book.authorId);

    if (!author) {
      throw new Error("Autor não encontrado.");
    }

    await this.bookRepository.update(book);
  }

  async delete(id: number): Promise<void> {
    const existingBook = await this.bookRepository.findById(id);

    if (!existingBook) {
      throw new Error("Livro não encontrado.");
    }

    if (!existingBook.available) {
      throw new Error("Não é possível excluir um livro emprestado.");
    }

    try {
      await this.bookRepository.delete(id);
    } catch (error) {
      throw new Error(
        "Não é possível excluir este livro porque ele possui histórico de empréstimos."
      );
    }
  }
}