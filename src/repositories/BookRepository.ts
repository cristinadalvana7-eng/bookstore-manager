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
}