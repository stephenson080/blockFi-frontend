import { useContext, useEffect, useState } from "react";

import Bottom from "../components/Background/Bottom";
import Top from "../components/Background/Top";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import SignupForm from "../components/Forms/SignupForm";

import styles from "../styles/Buttons.module.css";

import { UserContext } from "../contexts/user_context";
import { useConnectionStatus } from "@thirdweb-dev/react";

export default function Home() {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const status = useConnectionStatus();

  useEffect(() => {
    checkUser();
  }, [user]);
  function checkUser() {
    if (user && user.created) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  return (
    <div>
      <SignupForm
        visible={visible && status === "connected"}
        onClose={() => setVisible(false)}
      />
      <div className="bg-white">
        <Navbar />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <Top />
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                CertFi, The future of credential verification is here.
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                Blockchain technology is the latest innovation in credential
                verification, and it offers a number of advantages over
                traditional methods. With CertFi, you can be sure that your
                credentials are authentic, secure, and verifiable
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <button
                  onClick={() => {
                    if (status === "connected" && user && !user.created) {
                      setVisible(true);
                    }
                  }}
                  className={`${styles.primary} rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
          <Bottom />
        </div>
      </div>
      <Footer />
    </div>
  );
}
