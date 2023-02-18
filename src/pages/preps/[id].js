import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import moment from "moment/moment";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const Prep = ({ prep }) => {
  const title = `${prep.title} | LeapAdmission`;
  const description = `${prep.title} is course available for free by ${prep.credit} - LeapAdmission`;
  const keywords =
    "test preparation, IELTS, TOEFL, Duolingo, courses, online courses, study abroad, free courses";
  const url = `https://leapadmission.com/preps/${prep._id}`;
  const image = prep.poster;

  return (
    <Box pt="10" p={[2, 4, 5]} bg="gray.200">
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

      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(2, 1fr)"]}
        gap={6}
      >
        <GridItem w="100%" bg="white" borderRadius={"lg"} p="4">
          <AspectRatio
            bg="gray.100"
            ratio={1920 / 1080}
            borderRadius="lg"
            overflow={"hidden"}
          >
            <iframe title="naruto" src={prep.link} onPlayback />
          </AspectRatio>
        </GridItem>
        <GridItem w="100%" bg="white" borderRadius={"lg"} p="4">
          <Box>
            <Heading color={"gray.900"} as="h1" fontSize={[24, 28, 35]}>
              {prep.title}
            </Heading>
          </Box>

          <Tabs>
            <TabList justifyContent={"space-between"}>
              <Tab>Timestamps</Tab>
              <Tab>Credit</Tab>
              <Tab>Info</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <Flex mt="4" gap={2} flexDir="column">
                  {prep?.timestamp?.map((t) => (
                    <Link
                      key={t._id}
                      target="_blank"
                      href={`${prep.link.replace("embed/", "watch?v=")}&t=${
                        t.time
                      }s`}
                    >
                      <Box
                        w="100%"
                        p="2"
                        border={"2px"}
                        borderColor="teal"
                        _hover={{ bg: "teal", color: "white" }}
                        borderRadius="sm"
                      >
                        {t.title}
                      </Box>
                    </Link>
                  ))}
                </Flex>
              </TabPanel>
              <TabPanel>{prep.credit}</TabPanel>
              <TabPanel>
                <Text>
                  Posted on : {moment(prep.createdAt).format("DD MMM, YYYY")}
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    </Box>
  );
};

export async function getServerSideProps({ params }) {
  const { data } = await axios.get(
    process.env.ENDPOINT + `/api/preps/${params.id}`
  );
  return {
    props: { prep: data.prep },
  };
}

export default Prep;
