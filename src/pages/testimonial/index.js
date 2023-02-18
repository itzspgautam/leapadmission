import { Images } from "../../Constants";
import { Avatar, Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Testimonial } from "@/Components";
import Head from "next/head";

const TestimonialPage = ({ testimonials }) => {
  const title = "testimonials | LeapAdmission";
  const description =
    "See what our students have to say about the free counseling and guidance services provided by LeapAdmission. Read testimonials from satisfied students and learn how we helped them achieve their educational dreams.";
  const keywords =
    "testimonials, student reviews, LeapAdmission reviews, counseling, guidance, education, study abroad";
  const url = "https://www.leapadmission.com/testimonial";

  const image = `${process.env.ENDPOINT}/home.jpg`;

  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords} />
    <link rel="canonical" href={url} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </Head>;

  return <Testimonial testimonials={testimonials} />;
};

export async function getServerSideProps() {
  // Fetch testimonials using Axios
  const response = await axios.get(`${process.env.ENDPOINT}/api/testimonials`);
  const testimonials = response.data.testimonials;
  return {
    props: {
      testimonials,
    },
  };
}

export default TestimonialPage;
