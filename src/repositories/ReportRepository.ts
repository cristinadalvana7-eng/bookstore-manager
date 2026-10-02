import { database } from "../database/database";

export class ReportRepository {
  async findAvailableBooks(): Promise<any[]> {
    const result = await database.query(`
      SELECT
        b.id,
        b.title,
        a.name AS author
      FROM books b
      INNER JOIN authors a ON a.id = b.author_id
      WHERE b.available = TRUE
      ORDER BY b.title
    `);

    return result.rows;
  }

  async findBorrowedBooks(): Promise<any[]> {
    const result = await database.query(`
      SELECT
        b.id,
        b.title,
        c.name AS client,
        l.loan_date AS "loanDate"
      FROM loans l
      INNER JOIN books b ON b.id = l.book_id
      INNER JOIN clients c ON c.id = l.client_id
      WHERE l.returned = FALSE
      ORDER BY l.loan_date DESC
    `);

    return result.rows;
  }

  async findBooksByAuthor(): Promise<any[]> {
    const result = await database.query(`
      SELECT
        a.name AS author,
        COUNT(b.id) AS total_books
      FROM authors a
      LEFT JOIN books b ON b.author_id = a.id
      GROUP BY a.id, a.name
      ORDER BY total_books DESC, a.name
    `);

    return result.rows;
  }

  async findLoansPerBook(): Promise<any[]> {
    const result = await database.query(`
      SELECT
        b.title,
        COUNT(l.id) AS total_loans
      FROM books b
      LEFT JOIN loans l ON l.book_id = b.id
      GROUP BY b.id, b.title
      ORDER BY total_loans DESC, b.title
      LIMIT 10
    `);

    return result.rows;
  }

  async findActiveLoanClients(): Promise<any[]> {
    const result = await database.query(`
      SELECT
        c.id,
        c.name,
        c.email,
        COUNT(l.id) AS active_loans
      FROM clients c
      INNER JOIN loans l ON l.client_id = c.id
      WHERE l.returned = FALSE
      GROUP BY c.id, c.name, c.email
      ORDER BY active_loans DESC, c.name
    `);

    return result.rows;
  }
}