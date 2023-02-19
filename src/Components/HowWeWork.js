import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  Icon,
  Progress,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { BsFileEarmarkText, BsPencil, BsBox, BsCheck } from "react-icons/bs";

const steps = [
  {
    name: "Requirement",
    description:
      "Discuss academic background, career aspirations, and financial ability.",
    icon: BsFileEarmarkText,
  },
  {
    name: "Documentation",
    description:
      "Help you gather and prepare required documents for university application.",
    icon: BsPencil,
  },
  {
    name: "Application",
    description:
      "Guide you through the application process, including filling out forms and submitting documents.",
    icon: BsBox,
  },
  {
    name: "Admission",
    description:
      "Help you track application status and communicate with universities.",
    icon: BsCheck,
  },
];

const HowWeWork = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleCardHover = (stepIndex) => {
    setCurrentStep(stepIndex);
  };

  return (
    <Box bg="gray.800" py={16}>
      <Text
        as={"h2"}
        fontSize={[22, 24, 30]}
        fontWeight={"bold"}
        color="whiteAlpha.800"
        lineHeight={"1"}
        textAlign="center"
        pb="10"
      >
        How We Work
      </Text>
      <Container maxW="container.lg">
        <Progress
          colorScheme="orange"
          value={25 * (currentStep + 1)}
          max={100}
          mt={{ base: 10, md: 0 }}
          mb={{ base: 8, md: 12 }}
          animation="stripe 2s linear infinite"
          borderRadius={"full"}
        />
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
          {steps.map((step, index) => (
            <Flex
              key={step.name}
              direction="column"
              alignItems="center"
              bg={index <= currentStep ? "blue.500" : "blue.900"}
              borderRadius="md"
              p={4}
              boxShadow="md"
              color="white"
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={() => handleCardHover(currentStep)}
              _hover={{
                bg: "whiteAlpha.800",
                color: "blue.500",
                cursor: "pointer",
              }}
            >
              <Icon
                as={step.icon}
                boxSize={10}
                mb={4}
                color={index <= currentStep ? "white" : "blue.500"}
              />
              <Text
                as="h3"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="bold"
                textAlign="center"
                mb={2}
              >
                {step.name}
              </Text>
              <Text
                fontSize={{ base: "sm", md: "sm" }}
                fontWeight="regular"
                textAlign="center"
                mb={4}
              >
                {step.description}
              </Text>
            </Flex>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default HowWeWork;
