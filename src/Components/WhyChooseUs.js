import {
  Avatar,
  Box,
  Card,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiBook, BiMoney, BiSupport, BiTime } from "react-icons/bi";
import { Images } from "@/Constants";
const WhyChooseUs = () => {
  const WhyChooseUs = [
    {
      _id: "1",
      title: "Premium Services for Free",
      image: Images.WCU_SUPPORT,
      color: "orange",
      icon: <BiMoney size="30" />,
    },
    {
      _id: "2",
      title: "Your Personalised Admission Guru",
      image: Images.WCU_SUPPORT,
      color: "green",
      icon: <BiSupport size="30" />,
    },
    {
      _id: "3",
      title: "Get Insights from the Students and Alumni.",
      image: Images.WCU_SUPPORT,
      color: "blue",
      icon: <BiBook size="30" />,
    },
    {
      _id: "4",
      title: "Available Anytime",
      image: Images.WCU_SUPPORT,
      color: "facebook",
      icon: <BiTime size="30" />,
    },
  ];

  return (
    <Center
      flexDir={"column"}
      textAlign={"center"}
      gap={[5, 5, 8]}
      px="4"
      py="20"
    >
      <Text
        as={"h2"}
        fontSize={[22, 24, 30]}
        fontWeight={"bold"}
        color="blue.900"
        lineHeight={"1"}
      >
        Why Choose Us
      </Text>
      <Grid
        w={["100%", "80%", "70%"]}
        templateColumns={["repeat(2, 1fr)", "repeat(2, 1fr)", "repeat(4, 1fr)"]}
        gap={2}
      >
        {WhyChooseUs.map((item) => (
          <GridItem key={item._id}>
            <Center
              flexDir={"column"}
              gap="4"
              bgColor={"gray.50"}
              p="4"
              transition={".2s"}
              borderRadius={"md"}
              h="100%"
              justifyContent={"space-evenly"}
              _hover={{ boxShadow: "lg", bg: "blue.300" }}
            >
              <Center
                bg={`${item.color}.100`}
                h="20"
                w="20"
                borderRadius={"full"}
              >
                <Text color={`${item.color}.700`}>{item.icon}</Text>
              </Center>

              <Text
                fontSize={[14, 16, 16]}
                fontWeight="semibold"
                lineHeight={1.3}
                color="blue.900"
              >
                {item.title}
              </Text>
            </Center>
          </GridItem>
        ))}
      </Grid>
    </Center>
  );
};

export default WhyChooseUs;
