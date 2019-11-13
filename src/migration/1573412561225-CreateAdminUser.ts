import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1573412561225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user = new User();
    user.username = "admin";
    user.password = "admin";
    user.email = "admin@admin.com";
    user.hashPassword();
    user.role = "ADMIN";
    const userRepository = getRepository(User);
    await userRepository.save(user);

    user = new User();
    user.username = "admin-2";
    user.password = "admin";
    user.email = "admin-2@admin.com";
    user.hashPassword();
    user.role = "ADMIN";
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
