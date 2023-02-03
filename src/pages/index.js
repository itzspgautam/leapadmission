import {
  Features,
  Hero,
  Services,
  TestimonialCarausel,
  UniversityCarausel,
  WhyChooseUs,
} from "@/Components";

import React from "react";

const index = () => {
  return (
    <>
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
