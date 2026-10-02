import { database } from "./database/database";
import { showMainMenu } from "./menus/MainMenu";
import { showAuthorMenu } from "./menus/AuthorMenu";
import { showBookMenu } from "./menus/BookMenu";
import { showClientMenu } from "./menus/ClientMenu";
import { showLoanMenu } from "./menus/LoanMenu";
import { closeInput, ask } from "./utils/input";
import { ReportController } from "./controllers/ReportController";

const reportController = new ReportController();

async function main(): Promise<void> {
  try {
    await database.query("SELECT NOW()");
    console.log("Conexão com PostgreSQL realizada com sucesso.");

    let option = "";

    while (option !== "0") {
      option = await showMainMenu();

      switch (option) {
        case "1":
          await showAuthorMenu();
          break;

        case "2":
          await showBookMenu();
          break;

        case "3":
          await showClientMenu();
          break;

        case "4":
          await showLoanMenu();
          break;

        case "5": {
          let reportOption = "";

          while (reportOption !== "0") {
            console.log("\n=== Relatórios ===");
            console.log("1 - Livros disponíveis");
            console.log("2 - Livros emprestados");
            console.log("3 - Livros por autor");
            console.log("4 - Empréstimos por livro");
            console.log("5 - Clientes com empréstimos ativos");
            console.log("0 - Voltar");

            reportOption = await ask("Escolha uma opção: ");

            switch (reportOption) {
              case "1":
                await reportController.showAvailableBooks();
                break;

              case "2":
                await reportController.showBorrowedBooks();
                break;

              case "3":
                await reportController.showBooksByAuthor();
                break;

              case "4":
                await reportController.showLoansPerBook();
                break;

              case "5":
                await reportController.showActiveLoanClients();
                break;

              case "0":
                break;

              default:
                console.log("Opção inválida.");
            }
          }

          break;
        }

        case "0":
          console.log("Encerrando o sistema...");
          break;

        default:
          console.log("Opção inválida.");
      }
    }
  } catch (error) {
    console.error("Erro ao iniciar a aplicação:", error);
  } finally {
    closeInput();
    await database.end();
  }
}

main();