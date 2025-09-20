import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function SRedirect() {
  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      // No ID in URL, redirect to a notfound page
      window.location.href = "/notfound";
      return;
    }

    // Redirect the browser to the API route
    window.location.href = `/${id}`;
  }, [id]);

  return <p>Redirecting...</p>;
}