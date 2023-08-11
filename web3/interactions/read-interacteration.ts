import { BigNumber, ethers } from "ethers";
import ABI from "../ABI.json";
import { MUMBAI_RPC, _ADDRESS } from "../../utils/constants";
import Credential from "../../models/credentials";
import { Cred } from "../../utils/types";

function createBlocFiReadInstance() {
  const instance = new ethers.Contract(
    _ADDRESS,
    ABI,
    new ethers.VoidSigner(
      "0x0b90bFa298f00d7762658DD183848740eD1EB713",
      ethers.getDefaultProvider(MUMBAI_RPC)
    )
  );

  return instance;
}

export async function getCandidate(_address: string) {
  const instance = createBlocFiReadInstance();
  return await instance.getCandidate(_address);
}

export async function getInstitution(_address: string) {
  const instance = createBlocFiReadInstance();
  return await instance.getInstitution(_address);
}

export async function getInstitutions() {
  let insts: { name: string; id: number }[] = [];
  const instance = createBlocFiReadInstance();
  const noOfInstitutions = await instance.institutionIds();
  for (let i = 1; i < noOfInstitutions; i++) {
    const inst = await instance.institutions(i);
    if (inst.created) {
      insts.push({ name: inst.name, id: i });
    }
  }
  return insts;
}

export async function getCandidatesCredentials(
  address: string,
  noOfCert: ethers.BigNumber
) {
  const convertNum = formBigNumber(noOfCert);
  let credentialWithInstitution: Cred[] = [];
  const instance = createBlocFiReadInstance();
  const _id = await instance.resolveId(address, 0);
  const userId = formBigNumber(_id);
  for (let i = 1; i <= convertNum; i++) {
    const cred = await instance.candidates_credential(userId, i);
    if (cred.created) {
      const credentialNo = await instance.retrieveCredentialNo(i, cred.cid);
      const credential = new Credential(
        i,
        cred._hash,
        cred.cid,
        cred.issuer,
        cred.owner,
        cred.verified,
        cred.created,
        cred.issue_date,
        cred.credentialType,
        credentialNo
      );
      const inst = await instance.institutions(formBigNumber(cred.issuer));
      credentialWithInstitution.push({ credential, inst });
    }
  }
  console.log(credentialWithInstitution);
  return credentialWithInstitution;
}

export async function getInstitutionCredentials(address: string) {
  let credentialWithInstitution: Cred[] = [];
  const instance = createBlocFiReadInstance();
  const _id = await instance.resolveId(address, 1);
  const noOfCred = await instance.institutionIds();
  const institutionId = formBigNumber(_id);
  for (let i = 1; i <= noOfCred; i++) {
    const cred = await instance.institution_credential(institutionId, i);
    if (cred.created) {
      const credentialNo = await instance.retrieveCredentialNo(i, cred.cid);
      const credential = new Credential(
        i,
        cred._hash,
        cred.cid,
        cred.issuer,
        cred.owner,
        cred.verified,
        cred.created,
        cred.issue_date,
        cred.credentialType,
        credentialNo
      );
      const inst = await instance.institutions(formBigNumber(cred.issuer));
      credentialWithInstitution.push({ credential, inst });
    }
  }
  return credentialWithInstitution;
}

export function formBigNumber(value: ethers.BigNumber) {
  return +ethers.utils.formatUnits(value, "wei");
}
