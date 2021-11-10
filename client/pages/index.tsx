import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div>
      <h1 className="title">
        <Link href="/">
          <a>Missage</a>
        </Link>
      </h1>
      <h2>
        <Link href="/note">
          <a>My notes</a>
        </Link>
      </h2>
      <h2>
        <Link href="/download">
          <a>download</a>
        </Link>
      </h2>
    </div>
  );
};

export default Home;
