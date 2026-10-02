import { ReportRepository } from "../repositories/ReportRepository";

export class ReportService {
  private readonly reportRepository: ReportRepository;

  constructor() {
    this.reportRepository = new ReportRepository();
  }

  async findAvailableBooks(): Promise<any[]> {
    return this.reportRepository.findAvailableBooks();
  }

  async findBorrowedBooks(): Promise<any[]> {
    return this.reportRepository.findBorrowedBooks();
  }

  async findBooksByAuthor(): Promise<any[]> {
    return this.reportRepository.findBooksByAuthor();
  }

  async findLoansPerBook(): Promise<any[]> {
    return this.reportRepository.findLoansPerBook();
  }

  async findActiveLoanClients(): Promise<any[]> {
    return this.reportRepository.findActiveLoanClients();
  }
}