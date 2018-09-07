import { User } from "../models/user-model";
import { SqlUser } from "../dtos/sql-user";


export function userConverter(user: SqlUser) {
    return new User(user.ers_user_id, user.ers_username, undefined,
         user.user_first_name, user.user_last_name, user.user_email, userRoleValues[user.user_role_id]);
  }

  const userRoleValues = {
    1:"USER",
    2:"MANAGER"
  }