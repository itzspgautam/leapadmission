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
import { Features, HowWeWork, Services, WhyChooseUs } from "@/Components";
import { AiOutlineAim, AiOutlineEye } from "react-icons/ai";
import axios from "axios";
import Head from "next/head";
const about = () => {
  const title = "About Us | LeapAdmission";
  const description =
    "Learn more about LeapAdmission and our mission to help students apply to their dream universities with expert guidance and support from accomplished alumni and current students. Discover our free personalized counseling and courses today.";
  const keywords =
    "study abroad, personal guidance, free guidance, free counseling, free courses, apply to universities";
  const url = "https://www.leapadmission.com/contacts";

  const image = `${process.env.ENDPOINT}/home.jpg`;

  return (
    <div>
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
      </Head>

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
      <HowWeWork />
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
          <Text fontSize="lg">
            Welcome to LeapAdmission! Are you ready to go on a courageous,
            self-discovering, empowering journey with LeapAdmission?
          </Text>
          <Text fontWeight="normal">
            We are a non-profit organization that provides free guidance and
            support to students seeking to study abroad. Our mission is to help
            every student achieve their full potential by providing them with
            the resources and mentorship they need to pursue their education and
            career goals on an international level.
            <br />
            We understand that the process of applying to study abroad programs
            can be daunting and complex, which is why we are here to help. Our
            team of experienced mentors and counselors are dedicated to
            providing personalized guidance and support to each and every
            student we work with.
            <br />
            At LeapAdmission, we believe that everyone deserves access to
            international education, regardless of their background or financial
            situation. That{"'"}s why all of our services are completely free of
            charge. We rely on donations from generous individuals and
            organizations to keep our services running and to ensure that we can
            continue to help students for years to come.
            <br />
            Our approach is centered around the idea that every student is
            unique and requires individualized attention. We work closely with
            each student to assess their needs, interests, and goals, and then
            match them with a mentor who can provide personalized guidance and
            support throughout the entire application process.
            <br />
            We are committed to providing our students with a comprehensive and
            holistic approach to studying abroad. We believe that a successful
            study abroad experience is about more than just grades and test
            scores. It{"'"}s about finding the right fit for each individual
            student, both academically and personally.
            <br />
            At LeapAdmission, we are passionate about helping students realize
            their full potential and achieve their dreams on an international
            level. We are committed to providing free, high-quality guidance and
            support to every student who seeks our help. Join us on this journey
            and let us help you take the leap towards your future.
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
    </div>
  );
};

export default about;
