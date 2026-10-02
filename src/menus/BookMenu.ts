import { ask } from "../utils/input";
import { BookController } from "../controllers/BookController";

const bookController = new BookController();

export async function showBookMenu(): Promise<void> {
  let option = "";

  while (option !== "0") {
    console.log("\n=== Livros ===");
    console.log("1 - Cadastrar livro");
    console.log("2 - Listar livros");
    console.log("3 - Atualizar livro");
    console.log("4 - Excluir livro");
    console.log("0 - Voltar");

    option = await ask("Escolha uma opção: ");

    switch (option) {
      case "1": {
        const id = Number(await ask("ID do livro: "));
        const title = await ask("Título do livro: ");
        const authorId = Number(await ask("ID do autor: "));

        await bookController.create({
          id,
          title,
          authorId,
          available: true
        });
        break;
      }

      case "2":
        await bookController.findAll();
        break;

      case "3": {
        const id = Number(await ask("ID do livro: "));
        const title = await ask("Novo título: ");
        const authorId = Number(await ask("ID do autor: "));

        await bookController.update({
          id,
          title,
          authorId,
          available: true
        });
        break;
      }

      case "4": {
        const id = Number(await ask("ID do livro: "));

        await bookController.delete(id);
        break;
      }

      case "0":
        break;

      default:
        console.log("Opção inválida.");
    }
  }
}