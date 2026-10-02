import { ask } from "../utils/input";
import { LoanController } from "../controllers/LoanController";

const loanController = new LoanController();

export async function showLoanMenu(): Promise<void> {
  let option = "";

  while (option !== "0") {
    console.log("\n=== Empréstimos ===");
    console.log("1 - Registrar empréstimo");
    console.log("2 - Listar empréstimos");
    console.log("3 - Registrar devolução");
    console.log("0 - Voltar");

    option = await ask("Escolha uma opção: ");

    switch (option) {
      case "1": {
        const id = Number(await ask("ID do empréstimo: "));
        const bookId = Number(await ask("ID do livro: "));
        const clientId = Number(await ask("ID do cliente: "));
        const loanDate = await ask("Data do empréstimo (AAAA-MM-DD): ");

        await loanController.create({
          id,
          bookId,
          clientId,
          loanDate,
          returnDate: null,
          returned: false
        });

        break;
      }

      case "2":
        await loanController.findAll();
        break;

      case "3": {
        const id = Number(await ask("ID do empréstimo: "));
        const returnDate = await ask("Data da devolução (AAAA-MM-DD): ");

        await loanController.returnLoan(id, returnDate);

        break;
      }

      case "0":
        break;

      default:
        console.log("Opção inválida.");
    }
  }
}