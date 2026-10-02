import { ClientRepository } from "../repositories/ClientRepository";
import { ClientData } from "../models/Client";

export class ClientService {
  private readonly clientRepository: ClientRepository;

  constructor() {
    this.clientRepository = new ClientRepository();
  }

  async create(client: ClientData): Promise<void> {
    if (!client.name.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    if (!client.email.trim()) {
      throw new Error("O e-mail do cliente é obrigatório.");
    }

    await this.clientRepository.create(client);
  }

  async findAll(): Promise<ClientData[]> {
    return this.clientRepository.findAll();
  }

  async update(client: ClientData): Promise<void> {
    if (!client.name.trim()) {
      throw new Error("O nome do cliente é obrigatório.");
    }

    if (!client.email.trim()) {
      throw new Error("O e-mail do cliente é obrigatório.");
    }

    const existingClient = await this.clientRepository.findById(client.id);

    if (!existingClient) {
      throw new Error("Cliente não encontrado.");
    }

    await this.clientRepository.update(client);
  }

  async delete(id: number): Promise<void> {
    const existingClient = await this.clientRepository.findById(id);

    if (!existingClient) {
      throw new Error("Cliente não encontrado.");
    }

    await this.clientRepository.delete(id);
  }
}