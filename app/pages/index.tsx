"use client";
// pages/index.tsx
import React from 'react';
import StaticFooter from '../Components/StaticFooter/StaticFooter';
import styles from '../styles/Home.module.css';
import HeroSection from '../Components/HeroSection/HeroSection';

const Home: React.FC = () => {
  return (
    <div className={styles.viewport}>
      <HeroSection />
      <main className={styles.main}>

        {/* Other sections */}
      </main>
      <StaticFooter />
    </div>
  );
};

export default Home;