import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  IconButton,
  Center,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiMoney, BiSupport, BiBook, BiTime } from "react-icons/bi";

const WhyChooseUsData = [
  {
    _id: "1",
    title: "Premium Services for Free",
    color: "orange",
    icon: <BiMoney size="30" />,
  },
  {
    _id: "2",
    title: "Your Personalised Admission Guru",
    color: "green",
    icon: <BiSupport size="30" />,
  },
  {
    _id: "3",
    title: "Get Insights from the Students and Alumni.",
    color: "purple",
    icon: <BiBook size="30" />,
  },
  {
    _id: "4",
    title: "Available Anytime",
    color: "teal",
    icon: <BiTime size="30" />,
  },
];

const WhyChooseUsCard = ({ title, color, icon }) => {
  const hoverColor = useColorModeValue(`${color}.600`, `${color}.300`);

  const [hovered, setHovered] = useState(false);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="10rem"
      w="full"
      px={4}
      py={6}
      bg="white"
      border="1px"
      borderColor="gray.100"
      borderRadius="md"
      _hover={{ bg: hoverColor, color: "white" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      boxShadow="md"
    >
      <IconButton
        aria-label={title}
        bg={hovered ? hoverColor : color}
        color="white"
        borderRadius="full"
        icon={icon}
        size="lg"
        transition="all 0.2s"
        _hover={{ transform: "scale(1.1)" }}
      />
      <Heading mt={4} fontSize="lg" fontWeight="semibold" textAlign="center">
        {title}
      </Heading>
    </Flex>
  );
};

const WhyCooseUs = () => {
  return (
    <Box py={16} display="flex" alignItems={"center"} flexDir="column">
      <Heading textAlign="center" mb={8}>
        Why Choose Us
      </Heading>
      <Center maxW={["80%"]}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-around"
          align="center"
          gap="4"
        >
          {WhyChooseUsData.map((card) => (
            <WhyChooseUsCard
              key={card._id}
              title={card.title}
              color={card.color}
              icon={card.icon}
            />
          ))}
        </Flex>
      </Center>
    </Box>
  );
};

export default WhyCooseUs;
