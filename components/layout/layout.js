import Navbar from "./navbar2";

export default function Layout({ children }, chosenTab) {
  return (
    <>
      <Navbar chosenTab={chosenTab} />
      <main>{children}</main>
    </>
  );
}
