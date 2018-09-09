
import { connectionPool } from "../util/connection-util";
import { Reimbursement } from "../models/reimbursement-model";
import { reimbursementConvert, statusValueIds, typeValueIds } from "../util/reimbursement-converter";
import { resolveForm } from "../models/resolve-model";

export async function findAll(): Promise<Reimbursement[]> {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(
            `SELECT * FROM reimburse_system.ers_reimbursement`);

        const reimbursements = [];
        resp.rows.forEach((reimb_result) => {
            const reimbursement = reimbursementConvert(reimb_result);
            reimbursements.push(reimbursement);
        })
        return reimbursements;
    } finally {
        client.release();
    }
}
export async function createReimbursement(reimbursement: Reimbursement) {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`INSERT INTO reimburse_system.ers_reimbursement(reimb_amount,
        reimb_submitted,reimb_resolved,reimb_description,reimb_receipt,reimb_author,reimb_resolver,
        reimb_status_id, reimb_type_id) 
        VALUES ($1, NOW(), NULL, $2, NULL, $3, NULL, 1, $4) RETURNING reimb_id`,
            [reimbursement.amount, reimbursement.description, reimbursement.author,
            typeValueIds[reimbursement.type]]);
        return resp.rows[0].reimb_id;
    }
    finally {
        client.release();
    }
}

export async function resolveReimbursement(resolveInfo: resolveForm) {
    const client = await connectionPool.connect();
    try {
        const resp = await client.query(`UPDATE reimburse_system.ers_reimbursement
        SET reimb_resolved = NOW(), reimb_resolver = $1, reimb_status_id=$2
        WHERE reimb_id =  $3`, [resolveInfo.resolver, resolveInfo.newStatus, resolveInfo.reimbId]);

    }
    finally {
        client.release();
    }
}

