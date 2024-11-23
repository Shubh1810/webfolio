// pages/index.tsx
import React from 'react';
import Navbar from '@radix-ui/react-slot/app/Components/Navbar/Navbar';
import Footer from '@radix-ui/react-slot/app/Components/Footer/Footer';
import styles from '@radix-ui/react-slot/app/styles/Home.module.css';
import HeroSection from '@radix-ui/react-slot/app/Components/HeroSection/HeroSection';
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