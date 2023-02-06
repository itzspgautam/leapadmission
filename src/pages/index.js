import {
  Features,
  Hero,
  Services,
  TestimonialCarausel,
  UniversityCarausel,
  WhyChooseUs,
} from "@/Components";
import axios from "axios";
import Head from "next/head";

import React from "react";

const index = (props) => {
  return (
    <>
      <Head></Head>
      <Hero />
      <UniversityCarausel />
      <WhyChooseUs />
      <Features />
      <Services />
      <TestimonialCarausel testimonials={props.testimonials} />
    </>
  );
};

export const getServerSideProps = async () => {
  const response = await axios.get(process.env.ENDPOINT + "/api/testimonials");
  return { props: { testimonials: response.data.testimonials } };
};

export default index;
