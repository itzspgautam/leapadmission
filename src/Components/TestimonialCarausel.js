import { Images } from "@/Constants";
import {
  Avatar,
  Box,
  Card,
  Center,
  Container,
  Flex,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaQuoteRight } from "react-icons/fa";

const TestimonialCarausel = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent="center"
      bg="teal.100"
      gap={[5, 5, 8]}
      py="16"
      px={[0, 0, 20]}
    >
      <Text
        as={"h2"}
        fontSize={[28, 32, 38]}
        fontWeight={"bold"}
        color="teal.900"
        lineHeight={"1"}
        textAlign="center"
      >
        Testimonoals
      </Text>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={2000}
        draggable
        infinite
        minimumTouchDrag={80}
        pauseOnHover
        responsive={responsive}
        shouldResetAutoplay
        showDots={false}
        slidesToSlide={1}
        swipeable
      >
        {Images.UNIVERSITIES.map((e) => (
          <Box p="4" key={e}>
            <Center
              borderRadius={["md", "lg"]}
              p="4"
              bg="white"
              mt="10"
              flexDir={"column"}
              alignItems="left"
            >
              <Flex>
                <Image
                  height={100}
                  src={Images.USER_DEFAULT}
                  alt="User"
                  style={{
                    marginTop: "-50px",
                    borderRadius: "100%",
                    border: "4px solid white",
                  }}
                  size={"lg"}
                ></Image>
                <Box>
                  <Text
                    fontWeight={"bold"}
                    fontSize="18"
                    color={"teal.800"}
                    lineHeight="1"
                  >
                    Suraj Prakash Gautam
                  </Text>
                  <Text fontWeight={"medium"} fontSize="12" color={"teal.600"}>
                    Profession, University
                  </Text>
                </Box>
              </Flex>
              <Text
                fontSize={"14"}
                fontWeight="light"
                px="3"
                py="2"
                color={"gray.500"}
                textAlign="justify"
              >
                Laboris elit do occaecat id ad labore ut Lorem ea qui ea
                excepteur sit. Occaecat eiusmod elit mollit irure minim aute in
                elit est anim veniam nostrud culpa.
              </Text>
              <Flex w="100%" justifyContent={"flex-end"} color={"gray.400"}>
                <FaQuoteRight />
              </Flex>
            </Center>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default TestimonialCarausel;
