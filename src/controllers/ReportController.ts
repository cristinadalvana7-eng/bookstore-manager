import { ReportService } from "../services/ReportService";

export class ReportController {
  private readonly reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  async showAvailableBooks(): Promise<void> {
    try {
      const books = await this.reportService.findAvailableBooks();
      console.table(books);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
  }

  async showBorrowedBooks(): Promise<void> {
    try {
      const books = await this.reportService.findBorrowedBooks();
      console.table(books);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
  }

  async showBooksByAuthor(): Promise<void> {
    try {
      const books = await this.reportService.findBooksByAuthor();
      console.table(books);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
  }

  async showLoansPerBook(): Promise<void> {
    try {
      const loans = await this.reportService.findLoansPerBook();
      console.table(loans);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
  }

  async showActiveLoanClients(): Promise<void> {
    try {
      const clients = await this.reportService.findActiveLoanClients();
      console.table(clients);
    } catch (error) {
      console.error("Erro ao gerar relatório:", error);
    }
  }
}