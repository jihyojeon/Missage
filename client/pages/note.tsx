import Link from 'next/link';

export default () => {
  return (
    <div>
      <h1 className="title">
        <Link href="/">
          <a>Missage</a>
        </Link>
      </h1>
      <h2>Note Page</h2>
    </div>
  );
};