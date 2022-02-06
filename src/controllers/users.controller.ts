import { Request, Response } from "express";

class UsersController {
  async getAll(req: Request, res: Response) {}

  async getOne(req: Request, res: Response) {}

  async create(req: Request, res: Response) {}

  async update(req: Request, res: Response) {}

  async remove(req: Request, res: Response) {}
}

export const usersController = new UsersController();
