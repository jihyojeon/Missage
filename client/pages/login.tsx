import Link from 'next/link';
import React from 'react';

export default () => {
  return (
    <div>
      <h1 className="title">
        <Link href="/">
          <a>Missage</a>
        </Link>
      </h1>
      <h2>login Page</h2>
    </div>
  );
};
