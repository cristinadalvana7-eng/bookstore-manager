import { ask } from "../utils/input";

export async function showMainMenu(): Promise<string> {
  console.log("\n=== BookStore Manager ===");
  console.log("1 - Autores");
  console.log("2 - Livros");
  console.log("3 - Clientes");
  console.log("4 - Empréstimos");
  console.log("5 - Relatórios");
  console.log("0 - Sair");

  return ask("Escolha uma opção: ");
}