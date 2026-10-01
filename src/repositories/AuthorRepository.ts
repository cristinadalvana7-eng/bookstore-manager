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

  async findById(id: number): Promise<AuthorData | null> {
    const result = await database.query(
      "SELECT id, name FROM authors WHERE id = $1",
      [id]
    );

    return result.rows[0] ?? null;
  }

  async update(author: AuthorData): Promise<void> {
    await database.query(
      "UPDATE authors SET name = $1 WHERE id = $2",
      [author.name, author.id]
    );
  }

  async delete(id: number): Promise<void> {
    await database.query(
      "DELETE FROM authors WHERE id = $1",
      [id]
    );
  }
}