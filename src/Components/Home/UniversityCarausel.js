import { Images } from "@/Constants";
import { Box, Center } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const UniversityCarausel = () => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 8,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const styles = {
    container: {
      backgroundColor: "red",
      height: "1000px",
    },
  };
  return (
    <Box
      display={"flex"}
      flexDir={"column"}
      justifyContent="center"
      h={["15vh", "15vh", "30vh"]}
    >
      <Carousel
        additionalTransfrom={0}
        arrows={false}
        autoPlay={true}
        autoPlaySpeed={2000}
        centerMode={true}
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
          <Box p="2" key={e}>
            <Center
              h={"50px"}
              bg="white"
              border="1px"
              borderColor="blackAlpha.300"
              overflow={"hidden"}
              borderRadius={["md", "lg"]}
              p="4"
            >
              <Image
                src={require(`../../Assets/Images/University/${e}.webp`)}
                alt="University"
              />
            </Center>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
};

export default UniversityCarausel;
