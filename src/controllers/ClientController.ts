import { ClientService } from "../services/ClientService";
import { ClientData } from "../models/Client";

export class ClientController {
  private readonly clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  async create(client: ClientData): Promise<void> {
    try {
      await this.clientService.create(client);
      console.log("Cliente cadastrado com sucesso.");
    } catch (error) {
      console.error("Erro ao cadastrar cliente:", error);
    }
  }

  async findAll(): Promise<void> {
    try {
      const clients = await this.clientService.findAll();
      console.table(clients);
    } catch (error) {
      console.error("Erro ao listar clientes:", error);
    }
  }

  async update(client: ClientData): Promise<void> {
    try {
      await this.clientService.update(client);
      console.log("Cliente atualizado com sucesso.");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await this.clientService.delete(id);
      console.log("Cliente excluído com sucesso.");
    } catch (error) {
      console.error("Erro ao excluir cliente:", error);
    }
  }
}