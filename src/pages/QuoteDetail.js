import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import React, { Fragment, useEffect } from "react";

import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import Comments from "../components/comments/Comments";
import LoadingSpinner from "../components/UI/LoadingSpinner";

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

const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No quote found!</p>;
  }

  return (
    <Fragment>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={`${match.path}`} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
