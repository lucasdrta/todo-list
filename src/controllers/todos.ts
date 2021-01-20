import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export class TodosController {
  public async list(req: Request, res: Response): Promise<void> {
    try {
      const decoded = Object.values(req.decoded);

      const todo = await prisma.todo.findMany({
        where: {
          userId: decoded[0],
        },
      });

      res.status(200).send(todo);
    } catch (error) {
      res.status(400).send({
        code: 400,
        message: error.message,
      });
    }
  }

  public async create(req: Request, res: Response): Promise<void> {
    try {
      const { name } = req.body;
      const decoded = Object.values(req.decoded);

      const user = await prisma.user.findFirst({ where: { id: decoded[0] } });

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
