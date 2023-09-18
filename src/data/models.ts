export default interface Case {
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