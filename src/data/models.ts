export interface Case {
    _id: string;
    caseClient: string;
    caseName: string;
    caseID:number;
    caseNumber: number
    caseJury: string
    caseLink: string
    caseClientID: string
    appointments: Appointment[]
    assignedUser: ExistingUser
  
  }
  
  export interface Clients {
    _id: string;
    clientName: string
  }

  export interface Appointment {
    _id: string;
    title: string;
    date: string;
    description: string;
    relatedTo: string ;
    isDone: boolean;
    doneDate: string | null;
    user: string;
    comment: string;
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