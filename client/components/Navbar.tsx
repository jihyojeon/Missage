import Link from 'next/link';
import styles from './Navbar.module.css';
import { useFetchUser } from '../utils/user';

const Named = () => {
  const { user, loading } = useFetchUser();

  return (
    <div className={styles.navbar}>
      <div className="logo">
        <img src="../styles/logoremovebg.png" alt="" />
        <Link href="/product">
          <a>
            <img src="../styles/logoremovebg.png" alt="" />
          </a>
        </Link>
      </div>
      <div className={styles.menu}>
        <Link href="/product">
          <a>Product</a>
        </Link>
        <Link href="/download">
          <a>Download</a>
        </Link>
        <Link href="/pricing">
          <a>Pricing</a>
        </Link>
      </div>
      <div className={styles.auth}>
        {user && !loading ? (
          <>
            <Link href="/note">
              <a>My Note</a>
            </Link>
            <Link href="/api/logout">
              <a>Logout</a>
            </Link>
          </>
        ) : null}
        {!user && !loading ? (
          <>
            <Link href="/api/login">
              <a>Login</a>
            </Link>
            <Link href="/api/login">
              <a>Try Missage Free</a>
            </Link>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Named;
