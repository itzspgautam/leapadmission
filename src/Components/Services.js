import { Box, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcAcceptDatabase, FcApproval, FcCalendar } from "react-icons/fc";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack bg="gray.50" p="5" borderRadius={"md"}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function Services() {
  return (
    <Box p={4} py="16">
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FcApproval} w={10} h={10} />}
          title={"Application"}
          text={
            "We offer a complete service that includes evaluating the student's academic record, establishing reachable goals, advising the student throughout the application process, and advocating for the student. "
          }
        />
        <Feature
          icon={<Icon as={FcAcceptDatabase} w={10} h={10} />}
          title={"Admission"}
          text={
            "We offer a complimentary one-hour service to go over the application process with the student and their family. After this initial consultation, We follow up with the family to recommend an appropriate service for their needs."
          }
        />
        <Feature
          icon={<Icon as={FcCalendar} w={10} h={10} />}
          title={"Hourly Consultations"}
          text={
            "We are available on an hourly basis to give families advice about finding the right college, writing applications, standardized testing, and more."
          }
        />
      </SimpleGrid>
    </Box>
  );
}
