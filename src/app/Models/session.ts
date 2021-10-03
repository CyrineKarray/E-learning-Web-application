export interface Session {
  id?: number;
  lieu: string;
  dateDeb: string;
  dateFin: string;
  nbrParticipants: number;
  participants?: any;
  organisme?: any;
  formateur?: any;
  formation?: any;
}
