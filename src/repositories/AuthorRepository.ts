import { database } from "../database/database";
import { AuthorData } from "../models/Author";

export class AuthorRepository {
  async create(author: AuthorData): Promise<void> {
    await database.query(
      "INSERT INTO authors (id, name) VALUES ($1, $2)",
      [author.id, author.name]
    );
  }

  async findAll(): Promise<AuthorData[]> {
    const result = await database.query(
      "SELECT id, name FROM authors ORDER BY name"
    );

    return result.rows;
  }
}