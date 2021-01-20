import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import AuthService from '../services/auth';

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

  public async authenticate(
    req: Request,
    res: Response
  ): Promise<void | undefined> {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      res.status(401).send({
        code: 401,
        message: 'User not found',
      });
    }

    if (password !== user.password) {
      res.status(401).send({
        code: 401,
        message: 'Password does not match!',
      });
    }

    const token = AuthService.generateToken(user);
    res.status(200).send({ token });
  }
}
