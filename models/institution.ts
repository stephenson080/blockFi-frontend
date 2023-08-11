export default class Institution {
  name: string;
  website: string;
  created: boolean;
  verified: boolean;

  constructor(
    name: string,
    website: string,
    created: boolean,
    verified: boolean
  ) {
    this.name = name;
    this.website = website;
    this.verified = verified;
    this.created = created;
  }
}
