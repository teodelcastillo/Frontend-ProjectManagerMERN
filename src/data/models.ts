export interface Case {
    _id: string;
    caseClient: string;
    caseName: string;
    caseID:number;
    caseNumber: number
    caseJury: string
    caseLink: string
    caseClientID: string
  
  }
  
  export interface Clients {
    _id: string;
    clientName: string
  }

  export interface Appointments {
    _id: string; 
    type: string;
    date: Date;
    description: string;
    relatedTo: RelatedEntity[];
  }
  
  interface RelatedEntity {
    type: string;
    entityId: string;
  }
  