import { useContext, useEffect, useState } from "react";

import Bottom from "../../components/Background/Bottom";
import Top from "../../components/Background/Top";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

import { UserContext } from "../../contexts/user_context";
import { useAddress, useConnectionStatus } from "@thirdweb-dev/react";

import styles from "../../styles/Buttons.module.css";
import AddCredentail from "../../components/Forms/AddCredentialForm";
import { toast } from "react-toastify";
import {
  formBigNumber,
  getCandidatesCredentials,
} from "../../web3/interactions/read-interacteration";
import { Cred } from "../../utils/types";
import { dateFormater, truncate } from "../../utils/helpers";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  // More products...
];

export default function CredentialsPages() {
  const { user } = useContext(UserContext);
  const status = useConnectionStatus();
  const [visible, setVisible] = useState(false);
  const address = useAddress();
  const [candidateCredentials, setCandateCredentials] = useState<Cred[]>([]);

  useEffect(() => {
    _getUserCredential();
  }, [user, address]);

  useEffect(() => {
    checkUser();
  }, [user, address]);
  function checkUser() {
    if (user && user.created) {
    } else {
    }
  }

  async function _getUserCredential() {
    if (!address || !user) {
      return;
    }
    const id = toast.loading("Getting Credential");
    try {
      const cred = await getCandidatesCredentials(
        address,
        user.no_of_credentials
      );
      toast.dismiss(id);
      toast.success("Done");
      setCandateCredentials([...cred]);
    } catch (error) {
      toast.dismiss(id);
      toast.error("failed");
      console.log(error);
    }
  }

  return (
    <div>
      <AddCredentail
        onClose={() => {
          setVisible(false);
        }}
        visible={visible}
      />
      <div className="bg-white">
        <Navbar />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <Top />
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="flex w-full items-center justify-between">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Uploaded Credentials
              </h2>
              <div className="flex items-center ">
                <ArrowPathIcon
                  onClick={_getUserCredential}
                  color="gray"
                  className="h-6 w-6 mr-2"
                />
                <button
                  onClick={() => {
                    if (user && !user.verified) {
                      toast.error("Can't Add Credential. Account not Verified");
                      return;
                    }
                    setVisible(true);
                  }}
                  className={`${styles.primary} rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  Add Credential
                </button>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {candidateCredentials.map((cred) => {
                return (
                  <div key={cred.credential._id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src={"/cert_illustration.png"}
                        alt={"Cred"}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a
                            href={`https://${cred.credential.cid}.ipfs.w3s.link`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            Credential No:{cred.credential.credentialNo}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Issuer: {cred.inst.name}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          hash: {truncate(cred.credential.cid)}
                        </p>
                        <p
                          className={`mt-1 text-sm ${
                            cred.credential.verified
                              ? "text-green-600"
                              : "text-red-500"
                          }`}
                        >
                          {cred.credential.verified
                            ? "Approved"
                            : "Not Approved"}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        Date:{" "}
                        {
                          dateFormater(
                            formBigNumber(cred.credential.issue_date)
                          ).date
                        }
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Bottom />
        </div>
      </div>
      <Footer />
    </div>
  );
}
