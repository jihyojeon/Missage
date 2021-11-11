import Link from 'next/link';
import styles from './Navbar.module.css';

export default () => {
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
        <Link href="/note">
          <a>My note</a>
        </Link>
      </div>
      <div className={styles.auth}>
        <button>Log in</button>
        <button>Try Missage Free</button>
      </div>
    </div>
  );
};
