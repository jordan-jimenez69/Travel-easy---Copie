import LoginForm from "@/composants/comptes/login";
import Navbar from "@/composants/navbar";

export default function login () {
    return (
  
      <>
        <div>
          <Navbar />
        </div>

        <div>
          <LoginForm />
        </div>
  
      </>
    );
  }