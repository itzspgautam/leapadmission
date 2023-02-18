import {
  AspectRatio,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import { FaYoutube } from "react-icons/fa";

const TestPreps = ({ preps }) => {
  const title = "Test Preparation Courses | LeapAdmission";
  const description =
    "Get expert guidance and support for your test preparation with LeapAdmission. We offer courses for IELTS, TOEFL, Duolingo, and more. Sign up for free today!";
  const keywords =
    "test preparation, IELTS, TOEFL, Duolingo, courses, online courses, study abroad, free courses";
  const url = "https://leapadmission.com/preps";
  const image = `${process.env.ENDPOINT}/home.jpg`;

  return (
    <Box bg="gray.200">
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
      <Container py="16" maxW={["100vw", "80vw"]}>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
          ]}
          gap={6}
        >
          {preps?.preps?.map((prep) => (
            <GridItem
              w="100%"
              bg="white"
              borderRadius={"lg"}
              p="4"
              key={prep._id}
            >
              <AspectRatio
                bg="gray.100"
                ratio={1920 / 1080}
                borderRadius="lg"
                overflow={"hidden"}
              >
                <Image src={prep.poster} alt={prep.title} />
              </AspectRatio>
              <Box pt="4">
                <Heading color={"gray.900"} as="h3" fontSize={24} mt="2">
                  IELTS Preperation Full Course
                </Heading>
                <Text color={"gray.600"} mt="1" mb="2">
                  Credit: Youtuber Channel Name
                </Text>
                <hr />

                <Link href={`/preps/${prep._id}`}>
                  <Button
                    mt="6"
                    colorScheme={"red"}
                    w="100%"
                    leftIcon={<FaYoutube size="30" />}
                  >
                    Watch Now
                  </Button>
                </Link>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export async function getStaticProps() {
  // Fetch testimonials using Axios
  const res = await axios.get(process.env.ENDPOINT + "/api/preps");
  const preps = res.data;
  return {
    props: {
      preps,
    },
  };
}

export default TestPreps;
