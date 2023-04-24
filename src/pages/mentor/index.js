import { CallBack, HowWeWork, Testimonial } from "@/Components";
import { Box, Image, Text, Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

const index = ({ testimonials }) => {
  const title = "Our Mentor | Leap Admission";
  const description =
    "Meet Nilesh Mishra, Your Admission Guru | Leap Admission | Get expert guidance on studying abroad from Nilesh Mishra, your dedicated admission guru. With a GRE score of 316 and a master's degree in business analytics and project management from the University of Connecticut, Nilesh can help you navigate the admission process and secure scholarships. Contact Leap Admission today to schedule a consultation.";
  const image =
    "https://res.cloudinary.com/dltkycv3q/image/upload/v1676790441/Nilesh_Photo_tysumx.jpg";
  const keywords =
    "study abroad, admission guru, Nilesh Mishra, GRE, scholarships, University of Connecticut, business analytics, project management";
  const url = "https://www.leapadmission.com/mentor";
  const twitterHandle = "@LeapAdmission";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />

        <link rel="canonical" href={url} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={twitterHandle} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>

      <Flex bg="white" py={10} flexDir={"column"} gap={10}>
        <Flex
          bg={"gray.100"}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          mx="auto"
          maxW="7xl"
          px={6}
          p={8}
          borderRadius={8}
          _hover={{ background: "teal.100" }}
        >
          <Box flexShrink={0}></Box>
          <Box mt={{ base: 6, md: 0 }} ml={{ md: 6 }}>
            <Text
              mb={4}
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "3xl" }}
              color="gray.700"
              as={"h1"}
            >
              Sagar Likha -Admission Guru
            </Text>
            <Text mb={6} fontSize={{ base: "sm", md: "md" }} color="gray.500">
              As the Managing Director of LeapAdmission, I bring over a decade
              of experience in navigating the complex world of international
              admissions and visa applications. With a particular focus on F1
              and H1B visas, I have developed a special expertise in helping
              students and professionals to pursue their goals in the United
              States.
            </Text>
            <Text mb={6} fontSize={{ base: "sm", md: "md" }} color="gray.500">
              Additionally, I have served as a corporate job trainer, equipping
              aspiring tech professionals with the skills and knowledge
              necessary to succeed in today &apos;s competitive job market.
            </Text>
            <Link href="https://wa.me/+919821380110">
              <Button colorScheme="teal" size="md" leftIcon={<FaWhatsapp />}>
                WhatsApp
              </Button>
            </Link>
            <Link href="tel:+919821380110">
              <Button ml={4} size="md">
                Contact
              </Button>
            </Link>
          </Box>

          <Image
            src="https://res.cloudinary.com/dltkycv3q/image/upload/v1682328645/Sagr_Likha_zlrkul.png"
            alt="Nilesh Mishra"
            w={{ base: "100%", md: "auto" }}
            h={{ base: "auto", md: "450px" }}
            objectFit="cover"
            rounded="md"
            shadow="md"
            borderRadius={"100%"}
          />
        </Flex>

        <Flex
          bg={"gray.100"}
          direction={{ base: "column", md: "row" }}
          align={{ base: "center", md: "flex-start" }}
          mx="auto"
          maxW="7xl"
          px={6}
          p={8}
          borderRadius={8}
          _hover={{ background: "teal.100" }}
        >
          <Box flexShrink={0}>
            <Image
              src="https://res.cloudinary.com/dltkycv3q/image/upload/v1676790441/Nilesh_Photo_tysumx.jpg"
              alt="Nilesh Mishra"
              w={{ base: "100%", md: "auto" }}
              h={{ base: "auto", md: "450px" }}
              objectFit="cover"
              rounded="md"
              shadow="md"
              borderRadius={"100%"}
            />
          </Box>
          <Box mt={{ base: 6, md: 0 }} ml={{ md: 6 }}>
            <Text
              mb={4}
              fontWeight="bold"
              fontSize={{ base: "2xl", md: "3xl" }}
              color="gray.700"
              as={"h1"}
            >
              Nilesh Mishra -Admission Guru
            </Text>
            <Text mb={6} fontSize={{ base: "sm", md: "md" }} color="gray.500">
              GRE - 316, Master’s in Business Analytics and Project Management
              from University of Connecticut. Secured Deans Excellence
              Scholarship and 50% scholarship in UTD Texas.
            </Text>
            <Text mb={6} fontSize={{ base: "sm", md: "md" }} color="gray.500">
              Nilesh is an experienced admission guru who has helped numerous
              students achieve their dreams of studying abroad. He has a proven
              track record of success and is dedicated to helping students every
              step of the way.
            </Text>
            <Link href="https://wa.me/+17328616559">
              <Button colorScheme="teal" size="md" leftIcon={<FaWhatsapp />}>
                WhatsApp
              </Button>
            </Link>
            <Link href="tel:+17328616559">
              <Button ml={4} size="md">
                Contact
              </Button>
            </Link>
          </Box>
        </Flex>
      </Flex>
      <HowWeWork />
      <CallBack />
      <br />
      <br />
      <Testimonial testimonials={testimonials} type="static" />
    </>
  );
};

export async function getStaticProps() {
  // Fetch testimonials using Axios
  const response = await axios.get(`${process.env.ENDPOINT}/api/testimonials`);
  const testimonials = response.data.testimonials;
  return {
    props: {
      testimonials,
    },
  };
}

export default index;
