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
import React from "react";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
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
                  +1 123 456 7890
                </Text>
              </Flex>

              <Flex alignItems={"center"} gap="2" bg="teal.900">
                <Center h="10" w="10" bg="white">
                  <AiOutlineWhatsApp size={20} />
                </Center>
                <Text color={"white"} fontSize="14">
                  +1 123 456 7890
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
          Our Social Media Handle
        </Text>
        <Center gap={5}>
          <IconButton
            colorScheme={"facebook"}
            size="lg"
            h="16"
            w="16"
            rounded={"sm"}
          >
            <AiOutlineFacebook size={40} />
          </IconButton>
          <IconButton
            colorScheme={"purple"}
            size="lg"
            h="16"
            w="16"
            rounded={"sm"}
          >
            <AiOutlineInstagram size={40} />
          </IconButton>
          <IconButton
            colorScheme={"twitter"}
            size="lg"
            h="16"
            w="16"
            rounded={"sm"}
          >
            <AiOutlineTwitter size={40} />
          </IconButton>
          <IconButton
            colorScheme={"red"}
            size="lg"
            h="16"
            w="16"
            rounded={"sm"}
          >
            <AiOutlineYoutube size={40} />
          </IconButton>{" "}
          <IconButton
            colorScheme={"whatsapp"}
            size="lg"
            h="16"
            w="16"
            rounded={"sm"}
          >
            <AiOutlineWhatsApp size={40} />
          </IconButton>
        </Center>
      </Box>
      <TestimonialCarausel />
    </Box>
  );
};

export default contacts;
