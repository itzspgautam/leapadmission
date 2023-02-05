import {
  Features,
  Hero,
  Services,
  TestimonialCarausel,
  UniversityCarausel,
  WhyChooseUs,
} from "@/Components";
import Head from "next/head";

import React from "react";

const index = () => {
  return (
    <>
      <Head></Head>
      <Hero />
      <UniversityCarausel />
      <WhyChooseUs />
      <Features />
      <Services />
      <TestimonialCarausel />
    </>
  );
};

export default index;
