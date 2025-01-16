import React from 'react';

const Home = () => {
  return (
    <main className="flex_center flex-col">
      <section className="flex_center page_main flex-col text-center">
        <h1 className="text_highlight_gradient text_sub_heading_size">
          Empower Ideas, Inspire Change
        </h1>
        <h1 className="text_primary_gradient text_big_heading_size">
          Fund Your Vision
        </h1>
        <h1 className="md:mt-4 text_heading_size">
          with <span className="text_primary_gradient_2">CrowdFundIt</span>
        </h1>
        <p className="w-9/12 md:w-8/12 lg:w-7/12 xl:w-6/12 text-center mt-8">
          CrowdFundIt is your gateway to turning dreams into reality. Launch campaigns, connect with supporters, and secure funding through our decentralized platform. Empower your ideas while maintaining transparency and trust with blockchain technology.
        </p>
      </section>
    </main>
  );
};

export default Home;
