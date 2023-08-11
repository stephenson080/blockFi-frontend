import { PaperClipIcon } from "@heroicons/react/20/solid";
import { UserContext } from "../contexts/user_context";
import { useContext, useEffect, useState } from "react";

import Institution from "../models/institution";
import Navbar from "../components/Navbar";
import Top from "../components/Background/Top";
import Bottom from "../components/Background/Bottom";
import Footer from "../components/Footer";
import { Role } from "../utils/types";
import { formBigNumber } from "../web3/interactions/read-interacteration";

export default function Profile() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <div className="bg-white">
        <Navbar />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <Top />
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                {user && user.role === Role.Institution
                  ? "Institution"
                  : "Candidate"}{" "}
                Information
              </h3>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                details and application.
              </p>
            </div>
            <div className="mt-6 border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user ? user.name : ""}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Url
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user ? user.url : ""}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Account Status
                  </dt>
                  <dd
                    className={`mt-1 text-sm leading-6 ${
                      user && user.verified ? "text-green-600" : "text-red-600"
                    } sm:col-span-2 sm:mt-0`}
                  >
                    {user && user.verified ? "Verified" : "Unverified"}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    No of Credential Uploaded
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {user ? formBigNumber(user.no_of_credentials) : 0}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <Bottom />
        </div>
      </div>
      <Footer />
    </div>
  );
}
