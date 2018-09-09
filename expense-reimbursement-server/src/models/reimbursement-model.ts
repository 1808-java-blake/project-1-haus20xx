export class Reimbursement {
    id = 0;
    amount = 0;
    submittedTS = '';
    resolvedTS ='';
    description ='';
    author = 0;
    resolver = 0;
    status = '';
    type = '';
  
    constructor(id?: number, amount?: number, submittedTS?: string,resolvedTS?: string,
        description?: string, author?: number, resolver?: number, status?: string, type?: string) {
      id && (this.id = id);
      amount && (this.amount = amount);
      submittedTS && (this.submittedTS = submittedTS);
      resolvedTS && (this.resolvedTS = resolvedTS);
      description && (this.description = description);
      author && (this.author = author);
      resolver && (this.resolver = resolver);
      status && (this.status = status);
      type && (this.type = type);
    }
  }
