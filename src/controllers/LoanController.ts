import { LoanService } from "../services/LoanService";
import { LoanData } from "../models/Loan";

export class LoanController {
  private readonly loanService: LoanService;

  constructor() {
    this.loanService = new LoanService();
  }

  async create(loan: LoanData): Promise<void> {
    try {
      await this.loanService.create(loan);
      console.log("Empréstimo cadastrado com sucesso.");
    } catch (error) {
      console.error("Erro ao cadastrar empréstimo:", error);
    }
  }

  async findAll(): Promise<void> {
    try {
      const loans = await this.loanService.findAll();
      console.table(loans);
    } catch (error) {
      console.error("Erro ao listar empréstimos:", error);
    }
  }

  async returnLoan(id: number, returnDate: string): Promise<void> {
    try {
      await this.loanService.returnLoan(id, returnDate);
      console.log("Devolução registrada com sucesso.");
    } catch (error) {
      console.error("Erro ao registrar devolução:", error);
    }
  }
}