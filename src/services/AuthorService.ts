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
}