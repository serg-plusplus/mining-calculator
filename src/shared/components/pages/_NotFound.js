import React from 'react';
import Link from 'redux-first-router-link';

const NotFound = () => (
  <section className="pv3 pv4-l ph2">
    <header className="tc lh-copy">
      <h1 className="f1 f-headline-l code fw9 mv3 dib tracked-tight dark-green">
        404
      </h1>
      <h2 className="tc f2-l fw2 fw1-l">
        Sorry, we can't find the page you are looking for.
      </h2>
    </header>
    <p className="fw2 fw1-l i tc mt1 mt3-l f4 f3-l">
      Are you looking for one of these?
    </p>
    <p className="tc">
      <Link
        className="f6 br-pill dark-green no-underline ba grow pv2 ph3 dib"
        to="/"
      >
        Navigate to Home
      </Link>
    </p>
  </section>
);

export default NotFound;
