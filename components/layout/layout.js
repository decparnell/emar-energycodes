import { NewsBanner } from "../newsBanner";
import Navbar from "./navbar";
//import Footer from './footer'
import SecondNavbar from "./secondHeader";
export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <NewsBanner />
      <SecondNavbar />
      <main>{children}</main>
    </>
  );
}
