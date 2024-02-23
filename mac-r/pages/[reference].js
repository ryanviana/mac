import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectPage = () => {
  const router = useRouter();
  const { reference } = router.query;

  useEffect(() => {
    fetch(`/api/redirect?reference=${reference}`)
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = data.url;
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  }, [reference]);

  return <p>Redirecting...</p>;
};

export default RedirectPage;
