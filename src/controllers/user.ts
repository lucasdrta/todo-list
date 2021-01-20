import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class UserController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message,
      });
    }
  }
}
