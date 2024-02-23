// hooks/useRequireRole.ts
import { useEffect } from "react";
import { useRouter } from "next/router";

const useRequireRole = (requiredRole: string) => {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("userRole");

    if (role !== requiredRole) {
      // Redirect them to the login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      router.replace("/login?page=" + router.pathname);
    }
  }, [router, requiredRole]);
};

export default useRequireRole;
