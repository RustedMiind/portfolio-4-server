import { PrismaClient } from '@prisma/client';
import { PermissionEnum } from 'src/user/permission/permission.enum';
const prisma = new PrismaClient();

function seedPermissions() {
  return new Promise((resolve, reject) => {
    prisma.permission
      .createMany({
        data: [
          {
            name: PermissionEnum.MANAGE_ROLE,
            showName: 'Manage Roles',
          },
        ],
      })
      .then(resolve)
      .catch(reject);
  });
}
seedPermissions();
