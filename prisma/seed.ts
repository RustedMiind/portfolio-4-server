import { PrismaClient } from '@prisma/client';
import { PermissionName } from '../src/user/permission/permission.enum';
import { Variables } from '../src/variables/variables.enum';
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
function seedVariables() {
  return new Promise((resolve, reject) => {
    const keys: string[] = [];
    for (const value of Object.values(Variables)) {
      keys.push(value);
    }
    prisma.keyValue
      .createMany({ data: keys.map((key) => ({ key, value: '' })) })
      .then(resolve)
      .catch(reject);
  });
}
function dropVariables() {
  return new Promise((resolve, reject) => {
    prisma.keyValue.deleteMany().then(resolve).catch(reject);
  });
}

async function seed() {
  await dropPermissions();
  await seedPermissions();
  await dropVariables();
  await seedVariables();
}

seed();
