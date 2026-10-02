import { ask } from "../utils/input";
import { AuthorController } from "../controllers/AuthorController";

const authorController = new AuthorController();

export async function showAuthorMenu(): Promise<void> {
  let option = "";

  while (option !== "0") {
    console.log("\n=== Autores ===");
    console.log("1 - Cadastrar autor");
    console.log("2 - Listar autores");
    console.log("3 - Atualizar autor");
    console.log("4 - Excluir autor");
    console.log("0 - Voltar");

    option = await ask("Escolha uma opção: ");

    switch (option) {
      case "1": {
        const id = Number(await ask("ID do autor: "));
        const name = await ask("Nome do autor: ");

        await authorController.create({
          id,
          name
        });
        break;
      }

      case "2":
        await authorController.findAll();
        break;

      case "3": {
        const id = Number(await ask("ID do autor: "));
        const name = await ask("Novo nome: ");

        await authorController.update({
          id,
          name
        });
        break;
      }

      case "4": {
        const id = Number(await ask("ID do autor: "));

        await authorController.delete(id);
        break;
      }

      case "0":
        break;

      default:
        console.log("Opção inválida.");
    }
  }
}