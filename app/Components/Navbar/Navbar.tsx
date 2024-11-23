'use client';
// components/Navbar/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import { FiHome, FiUser, FiBriefcase, FiPhone } from 'react-icons/fi';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navContent}>
        {/* Logo */}
        <div className={styles.logo}>
          <Link href="/" className={styles.logoText}>
            Portfolio
          </Link>
        </div>
        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="/" className={styles.navItem}>
              <FiHome className={styles.icon} />
              <span className={styles.tooltip}>Home</span>
            </Link>
          </li>
          <li>
            <Link href="/about" className={styles.navItem}>
              <FiUser className={styles.icon} />
              <span className={styles.tooltip}>About</span>
            </Link>
          </li>
          <li>
            <Link href="#projects" className={styles.navItem}>
              <FiBriefcase className={styles.icon} />
              <span className={styles.tooltip}>Projects</span>
            </Link>
          </li>
          <li>
            <Link href="#contact" className={styles.navItem}>
              <FiPhone className={styles.icon} />
              <span className={styles.tooltip}>Contact</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;