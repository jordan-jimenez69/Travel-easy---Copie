import LoginForm from "@/composants/comptes/login";
import Footer from "@/composants/footer";
import Navbar from "@/composants/navbar";

export default function login () {
    return (
  
      <>
          <Navbar />

          <LoginForm />

          <Footer />
      </>
    );
  }