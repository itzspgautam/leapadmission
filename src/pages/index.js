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

const index = ({ testimonials }) => {
  return (
    <>
      <Head>
        <title>Leap Admission</title>
        <meta
          name="keywords"
          content="leap admission, study abroad, admission in usa, free admission in abroad,Personalised Admission Guru"
        />
        <meta
          name="description"
          content="Apply to your Dream universities, with our expert guidance and support from accomplished alumni and current students for free."
        />
      </Head>
      <Hero />
      <UniversityCarausel />
      <WhyChooseUs />
      <Features />
      <Services />
      <TestimonialCarausel testimonials={testimonials} />
    </>
  );
};

index.getInitialProps = async function () {
  const res = await axios.get(process.env.ENDPOINT + "/api/testimonials");
  const testimonials = res.data;
  return { testimonials };
};

export default index;
