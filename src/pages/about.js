import {
  Badge,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import BgWeb from "../Assets/Images/about-us-bg-web.png";
import BgMobile from "../Assets/Images/about-us-bg-mobile.png";
import { Images } from "@/Constants";
import { FaGlobe } from "react-icons/fa";
import {
  Features,
  Services,
  TestimonialCarausel,
  WhyChooseUs,
} from "@/Components";
import { AiOutlineAim, AiOutlineEye } from "react-icons/ai";
const about = () => {
  return (
    <div>
      <Box
        h={["95vh", "90vh", "90vh"]}
        bgColor={"teal.50"}
        overflow="hidden"
        position={"relative"}
      >
        <Box
          px={[4, 20, 20]}
          py="20"
          zIndex={1}
          h="100%"
          w="100vw"
          position={"absolute"}
        >
          <Badge colorScheme={"teal"} p="2">
            Our Mission
          </Badge>
          <Box>
            <Text
              maxW={["100vw", "70vw", "40vw"]}
              as="h3"
              color="blackAlpha.900"
              fontSize={[20, 24, 28]}
              fontWeight={"bold"}
            >
              Enabling every learner to study abroad by simplifying the process
              throughout their journey.
            </Text>
          </Box>
          <Flex gap="3" mt="4">
            {Images.FLAG.map((f) => (
              <Center
                key={f}
                h={["35px", "40px", "60px"]}
                w={["80px", "60px", "100px"]}
                borderRadius={"md"}
                bgImage={require(`../Assets/Images/Flags/${f}.png`).default.src}
                bgSize="cover"
                bgPosition={"center"}
              ></Center>
            ))}
            <Center
              bg="gray.300"
              color={"white"}
              h={["35px", "40px", "60px"]}
              w={["80px", "60px", "100px"]}
              borderRadius={"md"}
            >
              <FaGlobe size="24" />
            </Center>
          </Flex>
        </Box>
        <Box
          display={{ sm: "block", md: "none" }}
          bgImage={BgMobile.src}
          position="absolute"
          h="100%"
          w="100vw"
          bgSize={"cover"}
          bgPos="center"
          filter={"auto"}
          blur="2px"
          opacity={0.8}
        />

        <Box
          display={{ base: "none", md: "block" }}
          bgImage={BgWeb.src}
          position="absolute"
          h="100%"
          w="100vw"
          bgSize={"cover"}
          bgPos="center"
          filter={"auto"}
          blur="2px"
          opacity={0.8}
        />
      </Box>
      <Container py="16" px={[4, 4]} maxW={["100vw", "100vw", "70vw"]}>
        <Heading
          textAlign={"center"}
          fontWeight={"bold"}
          fontSize={["22", "24", "28"]}
          as={"h2"}
        >
          Introducing LeapAdmission
        </Heading>

        <Stack mt="5" spacing={4} fontWeight="light">
          <Text>
            Are you ready to go on a courageous, self-discovering, empowering
            journey with LeapAdmission?
          </Text>
          <Text>
            Est reprehenderit voluptate sint cupidatat aute. Minim ut fugiat
            aute consequat et irure exercitation reprehenderit Lorem sit dolore
            aliqua ullamco. Consequat exercitation esse amet labore ipsum
            voluptate laborum laborum commodo enim cupidatat aliquip aliqua.
            Officia adipisicing tempor fugiat enim deserunt dolore incididunt
            consequat culpa.
          </Text>
          <Text>
            Aliquip sint consectetur consequat ea cupidatat amet sit nulla
            eiusmod cillum nostrud magna labore. Mollit fugiat consequat sit
            irure esse ipsum laboris do. Id minim velit duis nostrud cupidatat
            velit id. Laboris officia do id Lorem anim reprehenderit ex commodo
            dolor fugiat et. Labore pariatur consectetur laborum esse voluptate
            nisi dolor occaecat duis qui ad mollit labore nulla. Proident minim
            est eiusmod ea dolor consequat dolore nulla commodo proident irure.
            Quis eiusmod deserunt nisi enim occaecat aliqua non. Ut adipisicing
            reprehenderit eiusmod non deserunt sunt anim commodo laborum
            voluptate. Proident incididunt laboris voluptate mollit pariatur.
            Mollit officia nulla dolore esse. Commodo excepteur aute elit enim
            sunt. Labore ullamco labore dolore dolore anim laborum eiusmod.
          </Text>
        </Stack>
      </Container>
      <Box
        py="20"
        bg={`url('${Images.MISSION_VISSION_BG.default.src}')`}
        bgSize="cover"
        bgColor="cyan.200"
        bgBlendMode={"soft-light"}
      >
        <Text
          pb="20"
          textAlign={"center"}
          as={"h2"}
          fontSize={[22, 24, 30]}
          fontWeight={"bold"}
          color="teal.900"
          lineHeight={"1"}
        >
          Mission & Vision
        </Text>
        <Center gap={[12, 5]} flexDir={["column", "row"]}>
          <Box
            bg="white"
            borderRadius={"md"}
            p="5"
            w={["90%", "45%", "30%"]}
            boxShadow="md"
          >
            <Flex
              justifyContent={"center"}
              alignItems="center"
              flexDir="column"
              gap="2"
            >
              <Box
                borderRadius={"full"}
                bg="white"
                boxShadow={"md"}
                p="5"
                mt="-60px"
                w="20"
                h="20"
              >
                <AiOutlineAim size="40" />
              </Box>
              <Text textAlign={"center"} fontWeight="semibold" fontSize={22}>
                Mission
              </Text>
              <Text fontWeight="light" fontSize={16}>
                Studying abroad should not be complex and costly. Enabling more
                students to study abroad by accelerating their path to success
                in universities abroad.
              </Text>
            </Flex>
          </Box>
          <Box
            bg="white"
            borderRadius={"md"}
            p="5"
            boxShadow="md"
            w={["90%", "45%", "30%"]}
          >
            <Flex
              justifyContent={"center"}
              alignItems="center"
              flexDir="column"
              gap="2"
            >
              <Box
                borderRadius={"full"}
                bg="white"
                boxShadow={"md"}
                p="5"
                mt="-60px"
                w="20"
                h="20"
              >
                <AiOutlineEye size="40" />
              </Box>
              <Text textAlign={"center"} fontWeight="semibold" fontSize={22}>
                Vision
              </Text>
              <Text fontWeight="light" fontSize={16}>
                Studying abroad should not be complex and costly. Enabling more
                students to study abroad by accelerating their path to success
                in universities abroad.
              </Text>
            </Flex>
          </Box>
        </Center>
      </Box>
      <WhyChooseUs />
      <Features />
      <Services />
      <TestimonialCarausel />
    </div>
  );
};

export default about;
