import "../styles/globals.css";
import "react-image-upload/dist/index.css";
import "react-toastify/dist/ReactToastify.css";
import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import {
  ThirdwebProvider,
  localWallet,
  metamaskWallet,
} from "@thirdweb-dev/react";
import { Mumbai } from "@thirdweb-dev/chains";
import UserContextProvider from "../contexts/user_context";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      supportedWallets={[metamaskWallet(), localWallet()]}
      supportedChains={[Mumbai]}
    >
      <UserContextProvider>
        <main className={poppins.className}>
          <Component {...pageProps} />
        </main>
      </UserContextProvider>
      <ToastContainer />
    </ThirdwebProvider>
  );
}

export default MyApp;
