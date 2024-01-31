import SignIn from "./signin/page";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <SignIn />
      <ToastContainer />
    </>
  );
}
