export class resolveForm {
    resolver = 0;
    newStatus = 0;
    reimbId = 0;
    constructor(resolver?: number, newStatus?: number, reimbId?: number) {
        resolver && (this.resolver = resolver);
        newStatus && (this.newStatus = newStatus);
        reimbId && (this.reimbId = reimbId);

    }
}