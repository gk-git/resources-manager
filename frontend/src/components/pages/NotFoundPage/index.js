import React from "react";

import PageTemplate from "../../templates/PageTemplate";
import Header from "../../organisms/Header";
import Footer from "../../organisms/Footer";

const NotFoundPage = () => {
  return (
    <PageTemplate header={<Header />} footer={<Footer />}>
      <h1>404 Not Found</h1>
    </PageTemplate>
  );
};

export default NotFoundPage;
