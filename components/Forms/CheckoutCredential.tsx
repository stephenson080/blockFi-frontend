import Input from "./Input";
import styles from "../../styles/Buttons.module.css";
import { useState } from "react";
import {
  checkoutCredential,
  formBigNumber,
} from "../../web3/interactions/read-interacteration";
import Candidate from "../../models/candidate";
import { Cred } from "../../utils/types";
import { toast } from "react-toastify";
import { dateFormater, truncate } from "../../utils/helpers";

export default function CheckOutCredentil() {
  const [credentialNo, setCredentialNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [cred, setCred] = useState<
    | { status: boolean; credential: Cred; owner: Candidate; hash: string }
    | undefined
  >();
  async function _check() {
    const id = toast.loading("Checking for Credential...");
    try {
      if (!credentialNo) return;
      const _cred = await checkoutCredential(credentialNo);

      if (_cred.status) {
        setCred(_cred);
      }
      toast.dismiss(id);
      toast.success("1 Credential Found");
      setLoading(false);
    } catch (error) {
      console.log(error);
      setCred(undefined);
      toast.dismiss(id);
      toast.warning("No Credential Found");
      setLoading(false);
    }
  }
  return (
    <div className="my-10" style={{ width: "100%", maxWidth: 500 }}>
      <h2 className="text-xl font-bold tracking-tight text-gray-900">
        Check out Credentials
      </h2>
      <div className=" w-full flex flex-row items-end justify-between">
        <div className="w-9/12">
          <Input
            label="Credential No"
            onChange={(v) => {
              setCredentialNo(v);
            }}
            type="text"
            required
          />
        </div>
        <div className="pb-2">
          <button
            disabled={!credentialNo}
            onClick={() => {
              _check();
            }}
            className={`${styles.primary} rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
          >
            Check
          </button>
        </div>
      </div>
      {cred && (
        <div className="my-10 shadow-md bg-white-600 px-4">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b text-gray-100">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Crendential No:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {cred.credential.credential.credentialNo}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b text-gray-100">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Owner:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {cred.owner.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b text-gray-100">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Issuer:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {cred.credential.inst.name}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b text-gray-100">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Credential Hash:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {truncate(cred.credential.credential.cid)}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b text-gray-100">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Issue Date:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {
                dateFormater(
                  formBigNumber(cred.credential.credential.issue_date)
                ).date
              }
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b text-gray-100">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Status:
            </dt>
            <dd
              className={`mt-1 text-sm leading-6 ${
                cred.credential.credential.verified
                  ? "text-green-600"
                  : "text-red-600"
              } sm:col-span-2 sm:mt-0`}
            >
              {cred.credential.credential.verified ? "Verified" : "Unverified"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 border-b text-gray-100">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              File Url:
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://${cred.credential.credential.cid}.ipfs.w3s.link`}
              >
                {truncate(cred.credential.credential.cid)}
              </a>
            </dd>
          </div>
        </div>
      )}
    </div>
  );
}
