import React from 'react';
import Footer from './Footer';
import MainSection from './MainSection';

import Navbar from './Navbar';

const Layout: React.FC = props => {
  return (
    <>
      <Navbar />
      <MainSection>{props.children}</MainSection>
      <Footer />
    </>
  );
};

export default Layout;
