import { database } from "../database/database";
import { BookData } from "../models/Book";

export class BookRepository {
  async create(book: BookData): Promise<void> {
    await database.query(
      `INSERT INTO books (id, title, author_id, available)
       VALUES ($1, $2, $3, $4)`,
      [book.id, book.title, book.authorId, book.available]
    );
  }

  async findAll(): Promise<BookData[]> {
    const result = await database.query(
      `SELECT id, title, author_id AS "authorId", available
       FROM books
       ORDER BY title`
    );

    return result.rows;
  }

  async findById(id: number): Promise<BookData | null> {
    const result = await database.query(
      `SELECT id, title, author_id AS "authorId", available
       FROM books
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] ?? null;
  }

  async update(book: BookData): Promise<void> {
    await database.query(
      `UPDATE books
       SET title = $1, author_id = $2
       WHERE id = $3`,
      [book.title, book.authorId, book.id]
    );
  }

  async delete(id: number): Promise<void> {
    await database.query(
      `DELETE FROM books
       WHERE id = $1`,
      [id]
    );
  }

  async updateAvailability(id: number, available: boolean): Promise<void> {
    await database.query(
      `UPDATE books
       SET available = $1
       WHERE id = $2`,
      [available, id]
    );
  }
}