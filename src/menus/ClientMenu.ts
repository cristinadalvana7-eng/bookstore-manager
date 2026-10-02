import { ask } from "../utils/input";
import { ClientController } from "../controllers/ClientController";

const clientController = new ClientController();

export async function showClientMenu(): Promise<void> {
  let option = "";

  while (option !== "0") {
    console.log("\n=== Clientes ===");
    console.log("1 - Cadastrar cliente");
    console.log("2 - Listar clientes");
    console.log("3 - Atualizar cliente");
    console.log("4 - Excluir cliente");
    console.log("0 - Voltar");

    option = await ask("Escolha uma opção: ");

    switch (option) {
      case "1": {
        const id = Number(await ask("ID do cliente: "));
        const name = await ask("Nome do cliente: ");
        const email = await ask("E-mail do cliente: ");

        await clientController.create({
          id,
          name,
          email
        });

        break;
      }

      case "2":
        await clientController.findAll();
        break;

      case "3": {
        const id = Number(await ask("ID do cliente: "));
        const name = await ask("Novo nome: ");
        const email = await ask("Novo e-mail: ");

        await clientController.update({
          id,
          name,
          email
        });

        break;
      }

      case "4": {
        const id = Number(await ask("ID do cliente: "));

        await clientController.delete(id);
        break;
      }

      case "0":
        break;

      default:
        console.log("Opção inválida.");
    }
  }
}