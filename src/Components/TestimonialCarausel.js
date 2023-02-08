import { Images } from "@/Constants";
import { Avatar, Box, Center, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaQuoteRight } from "react-icons/fa";

const TestimonialCarausel = ({ testimonials }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
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
        fontSize={[22, 24, 30]}
        fontWeight={"bold"}
        color="teal.900"
        lineHeight={"1"}
        textAlign="center"
      >
        Testimonials
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
        {testimonials?.testimonials?.map((tsm) => (
          <Box p="4" key={tsm._id}>
            <Center
              borderRadius={["md", "lg"]}
              p="4"
              bg="white"
              mt="10"
              flexDir={"column"}
              justifyContent="flex-start"
              alignItems="left"
              h="full"
            >
              {/* <Avatar name={tsm.author} /> */}
              <Flex>
                <Avatar
                  name={tsm.author}
                  src={
                    tsm.avatarURL
                      ? tsm.avatarURL
                      : Images.USER_DEFAULT.default.src
                  }
                  border="4px solid white"
                  marginTop="-40px"
                  size={"xl"}
                />

                <Box>
                  <Text
                    fontWeight={"bold"}
                    fontSize="18"
                    color={"teal.800"}
                    lineHeight="1"
                  >
                    {tsm.author}
                  </Text>
                  <Text fontWeight={"medium"} fontSize="12" color={"teal.600"}>
                    {tsm.description}
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
                <span dangerouslySetInnerHTML={{ __html: tsm.message }} />
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
