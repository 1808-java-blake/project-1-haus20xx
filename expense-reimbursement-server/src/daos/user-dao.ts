import { connectionPool } from "../util/connection-util";
import { User } from "../models/user-model";
import { userConverter } from "../util/user-converter";
import { hashPassword } from "../util/password-hasher";



export async function findAll(): Promise<User[]> {
    const client = await connectionPool.connect();
    try {
      const resp = await client.query(
        `SELECT * FROM reimburse_system.ers_users`);
  
      const users = [];
      resp.rows.forEach((user_result) => {
        const user = userConverter(user_result);
        const exists = users.some( existingUser => {
          if(user_result.user_id === existingUser.id) {
            return true;
          }
        })
        if (!exists) {
          users.push(user);
        }
      })
      return users;
    } finally {
      client.release();
    }
  }
  
export async function findByUsernameAndPassword(username: string, password: string): Promise<User> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM reimburse_system.ers_users
        WHERE reimburse_system.ers_users.ers_username = $1
        AND reimburse_system.ers_users.ers_password = $2`, [username, hashPassword(password)]);

        if (resp.rows.length !== 0) {
            return userConverter(resp.rows[0]); // get the user data from first row
        }
        return null;

    } finally {
        client.release();
    }
}

export async function createUser(user: User){
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
        `INSERT INTO reimburse_system.ers_users(ers_username, ers_password,
            user_first_name,user_last_name, user_email, user_role_id)
            VALUES ($1,$2,$3,$4,$5,$6)
            RETURNING ers_user_id`,[user.username,hashPassword(user.password),
                user.firstname,user.lastname, user.email,1]
        );
        return resp.rows[0].ers_user_id;
    } finally {
        client.release();
    }
}