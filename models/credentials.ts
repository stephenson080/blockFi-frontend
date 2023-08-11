import { ethers } from "ethers";

export default class Credential {
  issue_date: ethers.BigNumber;
  cid: string;
  _hash: string;
  credentialType: ethers.BigNumber;
  issuer: ethers.BigNumber;
  owner: ethers.BigNumber;
  verified: boolean;
  created: boolean;
  _id: number;
  credentialNo: string;

  constructor(
    _id: number,
    _hash: string,
    cid: string,
    issuer: ethers.BigNumber,
    owner: ethers.BigNumber,
    verified: boolean,
    created: boolean,
    issue_date: ethers.BigNumber,
    credentialType: ethers.BigNumber,
    credentialNo: string
  ) {
    this.credentialNo = credentialNo;
    this._id = _id;
    this._hash = _hash;
    this.cid = cid;
    this.created = created;
    this.credentialType = credentialType;
    this.issue_date = issue_date;
    this.issuer = issuer;
    this.owner = owner;
    this.verified = verified;
  }
}
