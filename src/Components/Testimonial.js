import { Avatar, Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import Link from "next/link";

const Testimonial = ({ testimonials, type }) => {
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
      bg="blackAlpha.900"
      gap={[5, 5, 8]}
      py="16"
      px={[0, 0, 20]}
    >
      <Text
        as={"h2"}
        fontSize={[22, 24, 30]}
        fontWeight={"bold"}
        color="whiteAlpha.800"
        lineHeight={"1"}
        textAlign="center"
      >
        Testimonials
      </Text>
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={5000}
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
        {testimonials?.map((tsm) => (
          <Box p="4" key={tsm._id} h={["40vh"]}>
            <Flex
              justifyContent={"space-between"}
              flexDir="column"
              bg="whiteAlpha.300"
              p="4"
              h="full"
              borderRadius={"lg"}
            >
              <Text fontSize={"13"} textColor="whiteAlpha.800" noOfLines={7}>
                <span dangerouslySetInnerHTML={{ __html: tsm.message }} />
              </Text>
              <Flex
                gap="2"
                borderTopWidth={"2px"}
                pt="4"
                borderColor={"whiteAlpha.200"}
              >
                <Avatar src={tsm.avatarURL} alt={tsm.author} border="2px" />
                <Box>
                  <Text fontSize={"16"} textColor="whiteAlpha.800">
                    {tsm.author}
                  </Text>
                  <Text fontSize={"10"} textColor="whiteAlpha.600">
                    {tsm.description}
                  </Text>
                </Box>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Carousel>
      {type === "static" && (
        <Center>
          <Link href="/testimonial">
            <Button size="sm" colorScheme={"whiteAlpha"} variant="ghost">
              View All
            </Button>
          </Link>
        </Center>
      )}
    </Box>
  );
};

export default Testimonial;
