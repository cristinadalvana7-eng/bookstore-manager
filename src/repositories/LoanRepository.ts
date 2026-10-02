import { database } from "../database/database";
import { LoanData } from "../models/Loan";

export class LoanRepository {
  async create(loan: LoanData): Promise<void> {
    await database.query(
      `INSERT INTO loans
       (id, book_id, client_id, loan_date, return_date, returned)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [
        loan.id,
        loan.bookId,
        loan.clientId,
        loan.loanDate,
        loan.returnDate,
        loan.returned
      ]
    );
  }

  async findAll(): Promise<LoanData[]> {
    const result = await database.query(
      `SELECT
        id,
        book_id AS "bookId",
        client_id AS "clientId",
        loan_date AS "loanDate",
        return_date AS "returnDate",
        returned
       FROM loans
       ORDER BY loan_date DESC`
    );

    return result.rows;
  }
    async returnLoan(id: number, returnDate: string): Promise<void> {
    await database.query(
      `UPDATE loans
       SET return_date = $1, returned = TRUE
       WHERE id = $2`,
      [returnDate, id]
    );
  }
}