import { PrismaClient } from '@prisma/client';
import { PermissionName } from '../src/user/permission/permission.enum';
const prisma = new PrismaClient();

function seedPermissions() {
  return new Promise((resolve, reject) => {
    prisma.permission
      .createMany({
        data: [
          {
            name: PermissionName.MANAGE_ROLE,
            showName: 'Manage Roles',
          },
        ],
      })
      .then(resolve)
      .catch(reject);
  });
}
seedPermissions();
