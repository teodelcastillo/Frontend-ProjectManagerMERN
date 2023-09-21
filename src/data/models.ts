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
    entityID: string;
    entityType: string;
  }

  export interface Users {
    _id: string;
    username: string;
    email: string;
    password: string
  }
  