import { LoanRepository } from "../repositories/LoanRepository";
import { LoanData } from "../models/Loan";
import { BookRepository } from "../repositories/BookRepository";
import { ClientRepository } from "../repositories/ClientRepository";

export class LoanService {
  private readonly loanRepository: LoanRepository;
  private readonly bookRepository: BookRepository;
  private readonly clientRepository: ClientRepository;

  constructor() {
    this.loanRepository = new LoanRepository();
    this.bookRepository = new BookRepository();
    this.clientRepository = new ClientRepository();
  }

  async create(loan: LoanData): Promise<void> {
    const book = await this.bookRepository.findById(loan.bookId);

    if (!book) {
      throw new Error("Livro não encontrado.");
    }

    if (!book.available) {
      throw new Error("Livro indisponível para empréstimo.");
    }

    const client = await this.clientRepository.findById(loan.clientId);

    if (!client) {
      throw new Error("Cliente não encontrado.");
    }

    await this.loanRepository.create(loan);
    await this.bookRepository.updateAvailability(loan.bookId, false);
  }

  async findAll(): Promise<LoanData[]> {
    return this.loanRepository.findAll();
  }
    async returnLoan(id: number, returnDate: string): Promise<void> {
    const loans = await this.loanRepository.findAll();

    const loan = loans.find((item) => item.id === id);

    if (!loan) {
      throw new Error("Empréstimo não encontrado.");
    }

    if (loan.returned) {
      throw new Error("Este empréstimo já foi devolvido.");
    }

    await this.loanRepository.returnLoan(id, returnDate);
    await this.bookRepository.updateAvailability(loan.bookId, true);
  }
}