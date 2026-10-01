import { AuthorRepository } from "../repositories/AuthorRepository";
import { AuthorData } from "../models/Author";

export class AuthorService {
  private readonly authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  async create(author: AuthorData): Promise<void> {
    if (!author.name.trim()) {
      throw new Error("O nome do autor é obrigatório.");
    }

    await this.authorRepository.create(author);
  }

  async findAll(): Promise<AuthorData[]> {
    return this.authorRepository.findAll();
  }

  async findById(id: number): Promise<AuthorData | null> {
    return this.authorRepository.findById(id);
  }

  async update(author: AuthorData): Promise<void> {
    if (!author.name.trim()) {
      throw new Error("O nome do autor é obrigatório.");
    }

    const existingAuthor = await this.authorRepository.findById(author.id);

    if (!existingAuthor) {
      throw new Error("Autor não encontrado.");
    }

    await this.authorRepository.update(author);
  }

  async delete(id: number): Promise<void> {
    const existingAuthor = await this.authorRepository.findById(id);

    if (!existingAuthor) {
      throw new Error("Autor não encontrado.");
    }

    await this.authorRepository.delete(id);
  }
}