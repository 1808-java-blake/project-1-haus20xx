
export function hashPassword(pass:string){
   let hash = require('object-hash');
   return hash(pass);
}