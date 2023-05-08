import React, { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorAlert from "../components/ErrorAlert";
import { useParams } from "react-router-dom";
import CardTemplate from "../components/CardTemplate";

function ShowBookPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  let params = useParams();

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        let response = await fetch("/api/books/" + params.id);
        let postData = await response.json();
        setPost(postData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching /api/books/" + params.id, error);
        setError(true);
      }
    }

    getData();

    return () => {
      // clean up function
    };
  }, [params.id]);

  if (error)
    return (
      <ErrorAlert details={"Book with id=" + params.id + " not found"} />
    );
  if (loading) return <LoadingSpinner />;

  return <CardTemplate props={post} />;
}

export default ShowBookPage;
