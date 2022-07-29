import { sql } from './instance';
import { User } from '../types/user';

export const createUser = async (
  user: Pick<User, 'name' | 'email' | 'password' | 'registrationDate'>
) => {
  return (await sql<Pick<User, 'id'>[]>`
    INSERT INTO users
    ${sql(user)}
    RETURNING id`)[0];
}

export const getUser = async (
  { id, select }: { id: User['id'], select?: (keyof User)[] }
) => {
  return (await sql<User[]>`
    SELECT ${select ? sql(select) : sql`*`} FROM users
    WHERE id = ${id}`)[0];
}

export const getUsers = async (
  { select }: { select?: (keyof User)[] } = {}
) => {
  return await sql<User[]>`
    SELECT ${select ? sql(select) : sql`*`} FROM users
    ORDER BY id ASC`;
}

export const updateUser = async (
  { id, ...user }: Partial<User> & Pick<User, 'id'>
) => {
  return (await sql<User[]>`
    UPDATE users
    SET
    ${sql(<any>user)}
    WHERE id = ${id}
    RETURNING *`)[0];
}

export const deleteUser = async (
  id: User['id']
) => {
  return (await sql<User[]>`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING *`)[0];
}
