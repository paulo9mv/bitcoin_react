import React from 'react';

import './App.css';
import { MainPage } from './components/MainPage';
import TopBar from './components/Topbar';
import FooterMenu from './components/FooterMenu';

function App() {
  const styles = {
    white: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    black: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    topBarHeight: 40,
    footerMenuHeight: 50
  };

  return (
    <div className="App">
      <header className="App-header">
      <TopBar styles={styles} />
        <MainPage />

        <FooterMenu />
      </header>
    </div>
  );
}

export default App;
