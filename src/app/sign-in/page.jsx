import React from "react";
import styles from "../../styles/signin.module.scss";
import SignIn from "../../components/sign-in/SignIn";

const SignInPage = () => {
  return (
    <div className={styles.signin}>
      <div className={styles.signin_container}>
        <SignIn></SignIn>
        
      </div>
    </div>
  );
};

export default SignInPage;
