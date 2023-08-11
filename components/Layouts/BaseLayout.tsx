import Bottom from "../Background/Bottom";
import Top from "../Background/Top";
import Footer from "../Footer";
import Navbar from "../Navbar";

type Props = {
  children: any;
};
export default function BaseLayout(props: Props) {
  return (
    <div>
      <div className="bg-white">
        <Navbar />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <Top />
          <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
            {props.children}
          </div>
          <Bottom />
        </div>
      </div>
      <Footer />
    </div>
  );
}
