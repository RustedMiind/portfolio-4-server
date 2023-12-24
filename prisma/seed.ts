import { PrismaClient } from '@prisma/client';
import { PermissionName } from '../src/user/permission/permission.enum';
const prisma = new PrismaClient();

function seedPermissions() {
  return new Promise((resolve, reject) => {
    const namesArr: string[] = [];
    for (const value of Object.values(PermissionName)) {
      namesArr.push(value);
    }
    prisma.permission
      .createMany({
        data: namesArr.map((name) => ({ name })),
      })
      .then(resolve)
      .catch(reject);
  });
}
function dropPermissions() {
  return new Promise((resolve, reject) => {
    prisma.permission.deleteMany().then(resolve).catch(reject);
  });
}

dropPermissions().then(seedPermissions);
