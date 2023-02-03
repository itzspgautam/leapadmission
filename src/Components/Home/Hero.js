import { Images } from "@/Constants";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdPhone } from "react-icons/md";
const Hero = () => {
  const [videobg, setVideoBg] = useState(null);
  useEffect(() => {
    setVideoBg(Images.HRO_BG);
  }, []);
  return (
    <Box
      pos="relative"
      height={["70vh", "60vh", "85vh"]}
      width="100%"
      bg="white"
      overflow={"hidden"}
      zIndex="1"
    >
      {videobg && (
        <AspectRatio pos="absolute" w="100%" bottom={[0, ""]} top={["", "0"]}>
          <video autoPlay loop muted height="100%" width="100%">
            <source src={Images.HRO_BG} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </AspectRatio>
      )}
      <Box
        bg="redy"
        pos="absolute"
        h="100%"
        w="100%"
        top="0"
        left={0}
        backgroundImage={[
          "linear-gradient(180deg , rgba(255,255,255,1),rgba(255,255,255,1),rgba(255,255,255,1),rgba(255,255,255,1), rgba(255,255,255,.5),rgba(255,255,255,0))",
          "linear-gradient(110deg , rgba(255,255,255,1),rgba(255,255,255,1),rgba(255,255,255,.9), rgba(255,255,255,.5),rgba(255,255,255,0),rgba(255,255,255,0))",
          "linear-gradient(110deg , rgba(255,255,255,1),rgba(255,255,255,1),rgba(255,255,255,.9), rgba(255,255,255,.5),rgba(255,255,255,0),rgba(255,255,255,0))",
        ]}
      >
        <Flex
          flexDir="column"
          justifyContent={["flex-start", "center", "flex-start"]}
          w={["100%", "60%", "50%"]}
          textAlign={["center", "left"]}
          h="100%"
          gap={[3, 3, 5]}
          p={[3, 4, 12]}
          pt={[12, 0, "15vh"]}
          pl={[3, 10, "100px"]}
        >
          <Heading fontSize={[30, 34, 50]} fontWeight={900} color="teal.900">
            Chase Your Dream
            <br /> <span style={{ color: "#319795" }}>With Us</span>
          </Heading>
          <Text fontSize={[16, 16, 20]} color={"gray.500"}>
            We Will Ensure That You Again Admission to the University That Best
            Suits Your Goals and Aspirations.
          </Text>
          <Flex gap="2" justifyContent={["center", "left"]} mt="2">
            <Button
              fontWeight={"regular"}
              colorScheme={"teal"}
              size={["md", "md", "lg"]}
              borderRadius="sm"
            >
              <MdPhone size={"18"} /> Contact us
            </Button>
            <Button
              fontWeight={"regular"}
              colorScheme={"teal"}
              variant="outline"
              borderWidth={2}
              size={["md", "md", "lg"]}
              borderRadius="sm"
              _hover={{ background: "teal", color: "white" }}
            >
              Our Services
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Hero;
