import RegisterForm from "@/composants/comptes/form-register";
import Navbar from "@/composants/navbar";

export default function register () {
    return (
  
      <>
        <div>
          <Navbar />
        </div>

        <div>
          <RegisterForm />
        </div>
  
      </>
    );
  }