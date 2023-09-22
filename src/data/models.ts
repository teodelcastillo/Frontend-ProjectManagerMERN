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
  
// Base interface with common properties
export interface NewUser {
  username: string;
  email: string;
  password: string;
}

// Interface for existing users (with _id)
export interface ExistingUser extends NewUser {
  _id: string;
}