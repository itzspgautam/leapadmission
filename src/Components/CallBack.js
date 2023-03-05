import { AppConfig } from "@/Config/AppConfig";
import { Images } from "@/Constants";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationTriangle,
  FaPhone,
  FaUser,
} from "react-icons/fa";

const CallBack = () => {
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
        `${AppConfig.API_ENDPOINT}/callback`,
        callBackData
      );
      console.log(data);
      setIsLoading(false);
      setStatus("success");
    } catch (error) {
      setError(
        <>
          <FaExclamationTriangle /> {error?.response?.data?.error}
        </>
      );
      setIsLoading(false);
      console.log(error?.response?.data);
    }
  };

  return (
    <Center p="2" id="callback" pt="16">
      <Flex
        justifyContent={"space-between"}
        bg="blue.500"
        w={["100vw", "80vw"]}
        borderRadius="xl"
        flexDir={["column", "column", "row"]}
        overflow="hidden"
      >
        <Center w={["100%", "100%", "70%"]} flexDir="column" p={[2]}>
          <Text
            pt="4"
            align={"center"}
            maxW={["100vw", "70vw", "40vw"]}
            as="h3"
            color="whiteAlpha.900"
            fontSize={[28]}
            fontWeight={"bold"}
            display={{ lg: "none" }}
          >
            Request Callback from Us
          </Text>

          <Image src={Images.CALLBACK_ART.default.src} alt="Call Back" />
        </Center>
        <Box w="100%" p="5" bg="blue.600">
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
                Thank you for submitting a call back request. Our team will be
                in touch with you shortly.
              </Text>
            </Stack>
          ) : (
            <form onSubmit={(e) => submitForm(e)}>
              <Stack
                spacing={4}
                p={[2, 5, 10]}
                justifyContent={"space-evenly"}
                h="100%"
              >
                <Text
                  align={"center"}
                  maxW={["100vw", "70vw", "40vw"]}
                  as="h3"
                  color="whiteAlpha.900"
                  fontSize={[24, 28, 32]}
                  fontWeight={"bold"}
                  display={{ base: "none", lg: "block" }}
                >
                  Request Callback from Us
                </Text>
                <Flex
                  color="red.100"
                  fontSize={[14]}
                  alignItems="center"
                  gap="1"
                >
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
                    placeholder="Message (Optional)"
                    name="message"
                    required
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
        </Box>
      </Flex>
    </Center>
  );
};

export default CallBack;
