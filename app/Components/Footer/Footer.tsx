// components/Footer/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} id="contact">
      <p>&copy; {new Date().getFullYear()} Shubh Sheth. All rights reserved.</p>
      <div className={styles.socialLinks}>
        {/* Add your social icons here */}
      </div>
    </footer>
  );
};

export default Footer;