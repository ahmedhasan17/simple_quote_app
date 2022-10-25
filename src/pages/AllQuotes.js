import QuoteList from "../components/quotes/QuoteList";
import React, { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_DATA = [
//   {
//     id: "q1",
//     author: "Ezio Auditore Da Firenze",
//     text: "Everything is permitted, Nothing is true.",
//   },
//   {
//     id: "q2",
//     author: "Altaïr",
//     text: "We see the world as it really is, and hope that one day all mankind might see the same.",
//   },
// ];

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
