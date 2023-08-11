import Credential from "../models/credentials";
import Institution from "../models/institution";

export enum Role {
  Candidate,
  Institution,
  Admin,
}

export interface Cred {
  inst: Institution;
  credential: Credential;
}
