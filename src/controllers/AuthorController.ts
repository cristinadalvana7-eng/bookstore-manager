import { AuthorService } from "../services/AuthorService";
import { AuthorData } from "../models/Author";

export class AuthorController {
  private readonly authorService: AuthorService;

  constructor() {
    this.authorService = new AuthorService();
  }

  async create(author: AuthorData): Promise<void> {
    try {
      await this.authorService.create(author);
      console.log("Autor cadastrado com sucesso.");
    } catch (error) {
      console.error("Erro ao cadastrar autor:", error);
    }
  }

  async findAll(): Promise<void> {
    try {
      const authors = await this.authorService.findAll();
      console.table(authors);
    } catch (error) {
      console.error("Erro ao listar autores:", error);
    }
  }

  async update(author: AuthorData): Promise<void> {
    try {
      await this.authorService.update(author);
      console.log("Autor atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar autor:", error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.authorService.delete(id);
      console.log("Autor excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir autor:", error);
    }
  }
}