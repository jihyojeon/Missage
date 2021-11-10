import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h2>
        <Link href="/note">
          <a>My notes</a>
        </Link>
      </h2>
      <h2>
        <Link href="/desktop">
          <a>download</a>
        </Link>
      </h2>
    </div>
  );
}
