import {
  CallBack,
  Features,
  Hero,
  Services,
  UniversityCarausel,
  WhyChooseUs,
} from "@/Components";
import axios from "axios";
import Head from "next/head";

import React from "react";
import TestimonialCarausel from "./testimonial";

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
      <CallBack />
      <WhyChooseUs />
      <Features />
      <Services />
      <TestimonialCarausel testimonials={testimonials} />
    </>
  );
};

export async function getStaticProps() {
  // Fetch testimonials using Axios
  const response = await axios.get(`${process.env.ENDPOINT}/api/testimonials`);
  const testimonials = response.data.testimonials;
  return {
    props: {
      testimonials,
    },
  };
}

export default index;
