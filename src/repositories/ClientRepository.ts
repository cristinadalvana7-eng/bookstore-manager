import { database } from "../database/database";
import { ClientData } from "../models/Client";

export class ClientRepository {
  async create(client: ClientData): Promise<void> {
    await database.query(
      `INSERT INTO clients (id, name, email)
       VALUES ($1, $2, $3)`,
      [client.id, client.name, client.email]
    );
  }

  async findAll(): Promise<ClientData[]> {
    const result = await database.query(
      `SELECT id, name, email
       FROM clients
       ORDER BY name`
    );

    return result.rows;
  }

  async findById(id: number): Promise<ClientData | null> {
    const result = await database.query(
      `SELECT id, name, email
       FROM clients
       WHERE id = $1`,
      [id]
    );

    return result.rows[0] ?? null;
  }

  async update(client: ClientData): Promise<void> {
    await database.query(
      `UPDATE clients
       SET name = $1, email = $2
       WHERE id = $3`,
      [client.name, client.email, client.id]
    );
  }

  async delete(id: number): Promise<void> {
    await database.query(
      `DELETE FROM clients
       WHERE id = $1`,
      [id]
    );
  }
}