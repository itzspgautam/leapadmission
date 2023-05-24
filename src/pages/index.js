import {
  CallBack,
  Features,
  Hero,
  Services,
  Testimonial,
  UniversityCarausel,
  WhyChooseUs,
} from "@/Components";
import axios from "axios";
import Head from "next/head";

import React from "react";

const index = ({ testimonials }) => {
  const title =
    "LeapAdmission | Rise by Lifting Others! Apply to Dream Universities with Expert Guidance and Support for Free";
  const description =
    "Get expert guidance and support from accomplished alumni and current students to apply to your dream universities for free. Rise by lifting others with personalized guidance on study abroad, personal growth, and more.";
  const url = "https://www.leapadmission.com";
  const image = `${process.env.ENDPOINT}/home.jpg`;

  const keywords =
    "study abroad, personal guidance, free guidance, free counseling, free courses, expert guidance, support, alumni, current students, dream universities, apply, rise, lifting others, personal growth.";
  const twitterHandle = "@LeapAdmission";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <link rel="canonical" href={url} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={twitterHandle} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <Hero />
    </>
  );
};

// export async function getStaticProps() {
//   // Fetch testimonials using Axios
//   const response = await axios.get(`${process.env.ENDPOINT}/api/testimonials`);
//   const testimonials = response.data.testimonials;
//   return {
//     props: {
//       testimonials,
//     },
//   };
// }

export default index;
