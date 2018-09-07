import { Reimbursement } from "../models/reimbursement-model";
import { SqlReimbursement } from "../dtos/sql-reimbursement";


export function reimbursementConvert(reimbursement: SqlReimbursement) {
    return new Reimbursement(reimbursement.reimb_id, reimbursement.reimb_amount, 
        reimbursement.reimb_submitted, reimbursement.reimb_resolved, reimbursement.reimb_description,
         reimbursement.reimb_author, reimbursement.reimb_resolver, statusIdValues[reimbursement.reimb_status_id], typeIdValues[reimbursement.reimb_type_id]);
  }

const statusIdValues={
    1: "PENDING",
    2: "APPROVED",
    3: "DENIED"

}
const typeIdValues={
    1:"LODGING",
    2:"TRAVEL",
    3:"FOOD",
    4:"OTHER"
}