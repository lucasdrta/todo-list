import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class TodosController {
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;

      const user = await prisma.user.findFirst({ where: { id: 1 } });

      const todo = await prisma.todo.create({
        data: {
          name,
          done: false,
          user: { connect: { id: user.id } },
        },
      });

      res.status(201).send(todo);
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message,
      });
    }
  }
}
