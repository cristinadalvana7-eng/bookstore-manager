import { BookService } from "../services/BookService";
import { BookData } from "../models/Book";

export class BookController {
  private readonly bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  async create(book: BookData): Promise<void> {
    try {
      await this.bookService.create(book);
      console.log("Livro cadastrado com sucesso.");
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
    }
  }

  async findAll(): Promise<void> {
    try {
      const books = await this.bookService.findAll();
      console.table(books);
    } catch (error) {
      console.error("Erro ao listar livros:", error);
    }
  }

  async update(book: BookData): Promise<void> {
    try {
      await this.bookService.update(book);
      console.log("Livro atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar livro:", error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.bookService.delete(id);
      console.log("Livro excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  }
}