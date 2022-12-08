import axios from "axios";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

interface IAuth {
  isLoggedIn: boolean;
}

const WithAuth = <P extends IAuth>(
  OriginalCompoenent: React.ComponentType<P>
) => {
  const Auth = (props: any) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setIsLoading] = useState<boolean | null>(null);
    const router = useRouter();

    useEffect(() => {
      setIsLoading(true);
      axios
        .get("http://localhost:3000/api/auth/checkAuth", {
          withCredentials: true,
        })
        .then((response) => {
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          router.push("/auth/login");
          setIsLoggedIn(false);
          setIsLoading(false);
        });
    }, []);

    return <OriginalCompoenent {...(props as any)} isLoggedIn={isLoggedIn} />;
  };

  return Auth;
};

export default WithAuth;
