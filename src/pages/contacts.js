import { AppConfig } from "@/Config/AppConfig";
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
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
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
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaPhone,
  FaUser,
} from "react-icons/fa";

const Contacts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const { name, email, phone, message } = e.target;
    const callBackData = {
      name: name.value,
      email: email.value,
      phone: phone.value,
      message: message.value,
    };

    try {
      const { data } = await axios.post(
        `${AppConfig.API_ENDPOINT}/contact`,
        callBackData
      );
      console.log(data);
      setIsLoading(false);
      setStatus("success");
    } catch (error) {
      console.log(error);
      setError(
        <>
          <FaExclamationTriangle /> {error?.response?.data?.error}
        </>
      );
      setIsLoading(false);
    }
  };

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
          bg="blue.400"
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
          {status === "success" ? (
            <Stack bg="white" p="5" borderRadius={"xl"} alignItems="center">
              <FaCheckCircle color="green" size="100" />
              <Text
                textAlign={"center"}
                fontSize={28}
                fontWeight="bold"
                color="green.600"
              >
                Submitted Successfully !
              </Text>
              <Text
                textAlign={"center"}
                maxW={["100%", "80%"]}
                color="blackAlpha.700"
              >
                Thanks for contacting us! We have received your message and will
                get back to you soon.
              </Text>
            </Stack>
          ) : (
            <form onSubmit={(e) => submitForm(e)} style={{ width: "100%" }}>
              <Stack spacing={4} justifyContent={"space-evenly"} h="100%" p="4">
                <Text
                  align={"center"}
                  maxW={["100vw", "70vw", "40vw"]}
                  as="h3"
                  color="blue.900"
                  fontSize={[24, 28, 32]}
                  fontWeight={"bold"}
                  display={{ base: "none", lg: "block" }}
                >
                  Contact Us
                </Text>
                <Flex color="red" fontSize={[14]} alignItems="center" gap="1">
                  {" "}
                  {error}
                </Flex>
                <InputGroup background={"white"}>
                  <InputLeftElement pointerEvents="none" color="blue.700">
                    <FaUser />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    required
                  />
                </InputGroup>
                <InputGroup background={"white"}>
                  <InputLeftElement pointerEvents="none" color="blue.700">
                    <FaPhone />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    placeholder="Phone Number"
                    name="phone"
                    required
                  />
                </InputGroup>
                <InputGroup background={"white"}>
                  <InputLeftElement pointerEvents="none" color="blue.700">
                    <FaEnvelope />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Email address"
                    name="email"
                    required
                  />
                </InputGroup>
                <InputGroup background={"white"}>
                  <Textarea
                    type="text"
                    placeholder="Massage (Optional)"
                    name="message"
                  />
                </InputGroup>
                <Center justifyContent={"flex-end"}>
                  <Button
                    isLoading={isLoading}
                    type="submit"
                    w="40%"
                    colorScheme={"green"}
                  >
                    Submit
                  </Button>
                </Center>
              </Stack>
            </form>
          )}
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

export default Contacts;
