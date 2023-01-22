import { Request, Response } from "express";
import { typeOrmConfig } from "../config/typeorm.config";
import { UserEntity } from "../models/UserEntity";
import { Repository } from "typeorm";

export class UserService {
  constructor() {}

  userRepository: Repository<UserEntity> =
    typeOrmConfig.getRepository(UserEntity);

  public getUserWithEmail = async (
    email: string
  ): Promise<UserEntity> | null => {
    return await this.userRepository
      .createQueryBuilder()
      .select("user")
      .from(UserEntity, "user")
      .where({ email })
      .getOne();
  };

  public findAllUser = async (req: Request, res: Response) => {
    try {
      const existUsers = await this.userRepository
        .createQueryBuilder()
        .select("user")
        .from(UserEntity, "user")
        .getMany();

      if (!existUsers.length) {
        return res.status(404).json({
          success: false,
          message: "데이터베이스에 저장된 유저가 없습니다.",
        });
      }

      res.status(200).json({
        success: true,
        message: "전체 유저를 가져옵니다",
        result: existUsers,
      });
    } catch (err) {
      console.error(err);
    }
  };

  public findOneUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;

      const existUser = await this.getUserWithEmail(email);

      if (!existUser) {
        return res.status(404).json({
          success: false,
          message: "유저를 찾을수 없습니다.",
        });
      }

      res.status(200).json({
        success: true,
        message: "유저를 가져옵니다.",
        result: existUser,
      });
    } catch (err) {
      console.error(err);
    }
  };

  public addUser = async (req: Request, res: Response) => {
    try {
      const { email, firstName, lastName, age } = req.body;

      const userAddDto = {
        email,
        firstName,
        lastName,
        age,
      };

      const existUser = await this.getUserWithEmail(email);

      if (email && existUser) {
        return res
          .status(400)
          .json({ success: false, message: "중복된 email 주소입니다." });
      }

      const createdUser = this.userRepository.create(userAddDto);

      await this.userRepository.save(createdUser);

      res.status(201).json({ success: true, message: "유저를 생성합니다." });
    } catch (err) {
      console.error(err);
    }
  };

  public modifyUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;

      const existUser = await this.getUserWithEmail(email);

      if (!existUser) {
        return res.status(404).json({
          success: false,
          message: "유저를 찾을수 없습니다.",
        });
      }

      await this.userRepository
        .createQueryBuilder()
        .update(UserEntity)
        .set(req.body)
        .where({ email })
        .execute();

      res
        .status(200)
        .json({ success: true, message: "유저의 정보를 변경합니다." });
    } catch (err) {
      console.error(err);
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const { email } = req.params;

      const existUser = await this.getUserWithEmail(email);

      if (!existUser) {
        return res.status(404).json({
          success: false,
          message: "유저를 찾을수 없습니다.",
        });
      }

      await this.userRepository
        .createQueryBuilder()
        .delete()
        .from(UserEntity)
        .where({ email })
        .execute();

      res.status(200).json({ success: true, message: "유저를 제거합니다." });
    } catch (err) {
      console.error(err);
    }
  };
}
