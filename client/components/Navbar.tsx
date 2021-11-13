import Link from 'next/link';
import styles from './Navbar.module.css';
import { Layout, Menu } from 'antd';
import styled from 'styled-components';
import { useFetchUser } from '../utils/user';

export default () => {
  const { user, loading } = useFetchUser();

  return (
    <div className={styles.navbar}>
      <div className="logo">
        <Link href="/product">
          <a>Missage</a>
        </Link>
      </div>
      <div className={styles.menu}>
        <Link href="/product">
          <a>Product</a>
        </Link>
        <Link href="/download">
          <a>Download</a>
        </Link>
      </div>
      <div className={styles.auth}>
        {user && !loading ? (
          <>
            <Link href="/api/logout">
              <a>Logout</a>
            </Link>
            <Link href="/note">
              <a>My Note</a>
            </Link>
          </>
        ) : null}
        {!user && !loading ? (
          <Link href="/api/login">
            <a>Login</a>
          </Link>
        ) : null}
        <button>Try Missage Free</button>
      </div>
    </div>
  );
};
