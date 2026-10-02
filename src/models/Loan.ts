export interface LoanData {
  id: number;
  bookId: number;
  clientId: number;
  loanDate: string;
  returnDate: string | null;
  returned: boolean;
}