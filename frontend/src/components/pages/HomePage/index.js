// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from "react";

import PageTemplate from "../../templates/PageTemplate";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";

const HomePage = () => {
  return (
    <PageTemplate header={<Header />} footer={<Footer />}>
      <h1>Home Page</h1>
    </PageTemplate>
  );
};

export default HomePage;
