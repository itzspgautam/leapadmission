import { TestimonialCarausel } from "@/Components";
import { Images } from "@/Constants";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineLinkedin,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineTwitter,
  AiOutlineWhatsApp,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FaPhone, FaUser } from "react-icons/fa";

const contacts = () => {
  return (
    <Box>
      <Head>
        <title>Contacts | LeapAdmission</title>
        <meta
          name="keywords"
          content="contacts leap admission,leapAdmission contacts, get in touch with leapAdmission,admission in abroad, admission in usa, free admission in abroad"
        />
        <meta
          name="description"
          content="Have a Question ? Need Some Help ? We are here for you Let’s Talk. Just Drop a Message For Us to Reach you.."
        />
      </Head>
      <Flex flexDir={["column", "column", "row"]}>
        <Flex
          bg="teal.400"
          flex="1"
          px="5"
          pt="16"
          flexDir={["column-reverse", "column", "row"]}
        >
          <Image
            src={Images.CONTACT_GIRL.default.src}
            h="400"
            w="90"
            alt="contact us"
          />
          <Box>
            <Stack spacing={2}>
              <Text
                maxW={["100vw", "70vw", "40vw"]}
                as="h3"
                color="white"
                fontSize={[24, 24, 28]}
                fontWeight={"bold"}
              >
                Get in Touch With Us
              </Text>
              <Text
                color="white.50"
                fontSize={[14, 24, 16]}
                fontWeight={"regular"}
              >
                Have a Question ? Need Some Help ? We are here for you Let’s
                Talk. Just Drop a Message For Us to Reach you.
              </Text>
            </Stack>
            <Stack mt="10">
              <Flex alignItems={"center"} gap="2" bg="teal.900">
                <Center h="10" w="10" bg="white">
                  <AiOutlineMail size={20} />
                </Center>
                <Text color={"white"} fontSize="14">
                  contact@leapadmission.com
                </Text>
              </Flex>

              <Flex alignItems={"center"} gap="2" bg="teal.900">
                <Center h="10" w="10" bg="white">
                  <AiOutlinePhone size={20} />
                </Center>
                <Text color={"white"} fontSize="14">
                  +1-860-209-8792
                </Text>
              </Flex>

              <Flex alignItems={"center"} gap="2" bg="teal.900">
                <Center h="10" w="10" bg="white">
                  <AiOutlineWhatsApp size={20} />
                </Center>
                <Text color={"white"} fontSize="14">
                  +1 732-861-6559
                </Text>
              </Flex>
            </Stack>
          </Box>
        </Flex>
        <Flex
          flex={1}
          bg="gray.100"
          p="4"
          justifyContent={"center"}
          alignItems="center"
        >
          <Stack spacing={4} w={["100%", "100%", "60%"]} p="10">
            <Text
              align={"center"}
              maxW={["100vw", "70vw", "40vw"]}
              as="h3"
              color="teal.900"
              fontSize={[20, 24, 18]}
              fontWeight={"bold"}
            >
              Contact Us
            </Text>

            <InputGroup background={"white"}>
              <InputLeftElement pointerEvents="none">
                <FaUser color="gray.300" />
              </InputLeftElement>
              <Input type="tel" placeholder="Full Name" />
            </InputGroup>
            <InputGroup background={"white"}>
              <InputLeftElement pointerEvents="none">
                <FaPhone color="gray.300" />
              </InputLeftElement>
              <Input type="tel" placeholder="Phone Number" />
            </InputGroup>
            <InputGroup background={"white"}>
              <Textarea type="tel" placeholder="Massage" />
            </InputGroup>
            <Center justifyContent={"flex-end"}>
              <Button w="40%" colorScheme={"teal"}>
                Submit
              </Button>
            </Center>
          </Stack>
        </Flex>
      </Flex>

      <Box py="16">
        <Text
          as="h3"
          color="gray.800"
          fontSize={[20, 24, 28]}
          fontWeight={"bold"}
          align="center"
          mb="5"
        >
          Follow us on
        </Text>
        <Center gap={5}>
          <Link href="https://facebook.com/leapadmission" target="_blank">
            <IconButton
              colorScheme={"facebook"}
              size="lg"
              h="16"
              w="16"
              rounded={"sm"}
            >
              <AiOutlineFacebook size={40} />
            </IconButton>
          </Link>
          <Link href="https://instagram.com/leapadmission" target="_blank">
            <IconButton
              colorScheme={"purple"}
              size="lg"
              h="16"
              w="16"
              rounded={"sm"}
            >
              <AiOutlineInstagram size={40} />
            </IconButton>
          </Link>
          <Link href="https://twitter.com/leapadmission" target="_blank">
            <IconButton
              colorScheme={"twitter"}
              size="lg"
              h="16"
              w="16"
              rounded={"sm"}
            >
              <AiOutlineTwitter size={40} />
            </IconButton>
          </Link>
          <Link href="https://youtube.com/leapadmission" target="_blank">
            <IconButton
              colorScheme={"red"}
              size="lg"
              h="16"
              w="16"
              rounded={"sm"}
            >
              <AiOutlineYoutube size={40} />
            </IconButton>
          </Link>
          <Link href="https://wa.me/+17328616559" target="_blank">
            <IconButton
              colorScheme={"whatsapp"}
              size="lg"
              h="16"
              w="16"
              rounded={"sm"}
            >
              <AiOutlineWhatsApp size={40} />
            </IconButton>
          </Link>
          <Link
            href="https://linkedin.com/company/leapadmission"
            target="_blank"
          >
            <IconButton
              colorScheme={"linkedin"}
              size="lg"
              h="16"
              w="16"
              rounded={"sm"}
            >
              <AiOutlineLinkedin size={40} />
            </IconButton>
          </Link>
        </Center>
      </Box>
    </Box>
  );
};

export default contacts;
