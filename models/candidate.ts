import { ethers } from "ethers";

export default class Candidate {
  name: string;
  profile_uri: string;
  created: boolean;
  is_verified: boolean;
  no_of_credentials: ethers.BigNumber;

  constructor(
    _name: string,
    profile: string,
    created: boolean,
    isVerified: boolean,
    noOfCertificates: ethers.BigNumber
  ) {
    this.created = created;
    this.is_verified = isVerified;
    this.name = _name;
    this.no_of_credentials = noOfCertificates;
    this.profile_uri = profile;
  }
}
