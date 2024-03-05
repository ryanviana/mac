import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectPage = () => {
  const router = useRouter();
  const { reference } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Await the fetch call to resolve, making the code cleaner and more readable
        const response = await fetch(`/api/redirect?reference=${reference}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error(
                `Network response was not ok, status: ${response.status}`
              );
            }
            return response.text(); // First get the text, then check if it's not empty
          })
          .then((text) => {
            if (!text) {
              throw new Error("Response body is empty");
            }
            const data = JSON.parse(text); // Safely parse the text as JSON
            console.log(data);
            window.location.href = data.url;
          })
          .catch((error) => {
            console.error("Fetch error:", error);
          });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Await the parsing of the JSON response
        const data = await response.json();
        console.log(data);
        // Redirect the user
        window.location.href = data.url;
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, [reference]); // Dependency array, re-run the effect when `reference` changes

  return <p>Redirecting...</p>;
};

export default RedirectPage;
