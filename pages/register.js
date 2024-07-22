import RegisterForm from "@/composants/comptes/form-register";
import Footer from "@/composants/footer";
import Navbar from "@/composants/navbar";

export default function register () {
    return (
  
      <>
          <Navbar />

          <RegisterForm />

          <Footer />
      </>
    );
  }