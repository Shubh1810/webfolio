// pages/index.tsx
import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import styles from '../styles/Home.module.css';
import HeroSection from '../Components/HeroSection/HeroSection';
const Home: React.FC = () => {
  return (
    <div className={styles.viewport}>
      <HeroSection />
      <Navbar />
      <main className={styles.main}>
        
        {/* Other sections */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;