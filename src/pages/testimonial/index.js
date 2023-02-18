import { Images } from "../../Constants";
import { Avatar, Box, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { Testimonial } from "@/Components";

const TestimonialPage = ({ testimonials }) => {
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
