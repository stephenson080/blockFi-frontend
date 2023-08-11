import { ethers } from "ethers";
import { _ADDRESS } from "../../utils/constants";
import ABI from "../ABI.json";

function createBlocFiWriteInstance(signer: ethers.Signer) {
  const instance = new ethers.Contract(_ADDRESS, ABI, signer);
  return instance;
}

export async function addCandidate(
  name: string,
  url: string,
  signer: ethers.Signer
) {
  try {
    const instance = createBlocFiWriteInstance(signer);
    const trx: ethers.ContractTransaction = await instance.addCandidate(
      name,
      url
    );
    return trx;
  } catch (err) {
    throw err;
  }
}

export async function addInstitution(
  name: string,
  website: string,
  signer: ethers.Signer
) {
  try {
    const instance = createBlocFiWriteInstance(signer);
    const trx: ethers.ContractTransaction = await instance.addInstitution(
      name,
      website
    );
    return trx;
  } catch (err) {
    throw err;
  }
}

export async function addCredential(
  cid: string,
  timestamp: number,
  credential_no: string,
  issuer: number,
  type: number,
  signer: ethers.Signer
) {
  try {
    const instance = createBlocFiWriteInstance(signer);
    const trx: ethers.ContractTransaction = await instance.addCredential(
      credential_no,
      cid,
      timestamp,
      type,
      issuer
    );
    return trx;
  } catch (err) {
    throw err;
  }
}

export async function verifyCredential(
  credentialNo: string,
  signer: ethers.Signer
) {
  try {
    const instance = createBlocFiWriteInstance(signer);
    const trx: ethers.ContractTransaction = await instance.verifyCredential(
      credentialNo
    );
    return trx;
  } catch (error) {
    throw error;
  }
}
