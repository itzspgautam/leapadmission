import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  Radio,
  Select,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const Analysis = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [altPhone, setAltPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

  return (
    <Box>
      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(5, 1fr)"]}
        m={4}
        bg={"blackAlpha.100"}
        borderRadius={6}
        overflow="hidden"
        gap={5}
      >
        <GridItem colSpan={[1, 1, 5]} bg="teal" p="1" px="4">
          <Text color={"white"}>Student Info</Text>
        </GridItem>
        <GridItem colSpan={[1, 1, 3]} p="4">
          <Stack spacing={4}>
            <HStack justifyContent={"space-between"}>
              <Flex width={"15%"}>
                <Text color={"blackAlpha.800"}>Name</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="row" gap={2}>
                <Input
                  placeholder="Full Name"
                  size="md"
                  background={"white"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Flex>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Flex width={"15%"}>
                <Text color={"blackAlpha.800"}>Phone</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="row" gap={2}>
                <Input
                  placeholder="+91 000 000 00"
                  size="md"
                  background={"white"}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Input
                  placeholder="Alternate Number"
                  size="md"
                  background={"white"}
                  value={altPhone}
                  onChange={(e) => setAltPhone(e.target.value)}
                />
              </Flex>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Flex width={"15%"}>
                <Text color={"blackAlpha.800"}>E-mail</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="row" gap={2}>
                <Input
                  type={"email"}
                  placeholder="example@website.domain"
                  size="md"
                  background={"white"}
                />
              </Flex>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Flex width={"15%"}>
                <Text color={"blackAlpha.800"}>Dob</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="row" gap={2}>
                <Input
                  type={"date"}
                  placeholder="example@website.domain"
                  size="md"
                  background={"white"}
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Flex>
            </HStack>
            <HStack justifyContent={"space-between"} alignItems="flex-start">
              <Flex width={"15%"}>
                <Text color={"blackAlpha.800"}>Address</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="column" gap={2}>
                <Flex flexGrow={1} flexDir="row" gap={2}>
                  <Input
                    placeholder="Area/Locality"
                    size="md"
                    background={"white"}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <Input
                    placeholder="District"
                    size="md"
                    background={"white"}
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                </Flex>
                <Flex flexGrow={1} flexDir="row" gap={2}>
                  <Input
                    placeholder="State"
                    size="md"
                    background={"white"}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <Input
                    placeholder="Country"
                    size="md"
                    background={"white"}
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Flex>
                <Flex flexGrow={1} flexDir="row" gap={2}>
                  <Input
                    type={"number"}
                    width={"50%"}
                    placeholder="State"
                    size="md"
                    background={"white"}
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </Flex>
              </Flex>
            </HStack>
          </Stack>
        </GridItem>
        <GridItem p="4" colSpan={[1, 1, 2]}>
          <Text color={"teal"} fontSize={18} fontWeight="bold">
            Program
          </Text>
          <Stack spacing={4} mt="5">
            <HStack justifyContent={"space-between"} alignItems="flex-start">
              <Flex width={"30%"}>
                <Text color={"blackAlpha.800"}>Country</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="column" gap={2}>
                <Select bgColor={"white"} />
              </Flex>
            </HStack>

            <HStack justifyContent={"space-between"} alignItems="flex-start">
              <Flex width={"30%"}>
                <Text color={"blackAlpha.800"}>Program Level</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="column" gap={4}>
                <Stack direction="row" spacing={20}>
                  <Radio value="1" bgColor={"white"}>
                    Batchlors
                  </Radio>
                  <Radio value="2" bgColor={"white"}>
                    Masters
                  </Radio>
                </Stack>
                <Stack direction="row" spacing={20}>
                  <Radio value="1" bgColor={"white"}>
                    Doctrate
                  </Radio>
                  <Radio value="2" bgColor={"white"}>
                    Associate
                  </Radio>
                </Stack>
                <Stack direction="row" spacing={20}>
                  <Radio value="1" bgColor={"white"}>
                    Certificate
                  </Radio>
                  <Radio value="2" bgColor={"white"}>
                    Online
                  </Radio>
                </Stack>
                <Stack direction="row" spacing={20}>
                  <Radio value="1" bgColor={"white"}>
                    High School
                  </Radio>
                </Stack>
              </Flex>
            </HStack>
          </Stack>
        </GridItem>
      </Grid>

      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(5, 1fr)"]}
        m={4}
        bg={"blackAlpha.100"}
        borderRadius={6}
        overflow="hidden"
        gap={5}
      >
        <GridItem colSpan={[1, 1, 5]} bg="teal" p="1" px="4">
          <Text color={"white"}>University</Text>
        </GridItem>
        <GridItem colSpan={[1, 1, 3]} p="4">
          <HStack spacing={4}>
            <VStack alignItems="flex-start" w="100%">
              <Text color={"blackAlpha.800"}>University Name</Text>
              <Select
                size="md"
                background={"white"}
                placeholder="Select University"
              />
            </VStack>
            <VStack alignItems="flex-start" w="100%">
              <Text color={"blackAlpha.800"}>Program Name</Text>
              <Select
                size="md"
                background={"white"}
                placeholder="Select Program"
              />
            </VStack>
            <VStack alignItems="flex-start" w="100%">
              <Text color={"blackAlpha.800"}>Term</Text>
              <Select
                size="md"
                background={"white"}
                placeholder="Select Term"
              />
            </VStack>
          </HStack>
          <Button colorScheme={"teal"} mt="4">
            Add
          </Button>
        </GridItem>
        <GridItem p="4" colSpan={[1, 1, 2]}>
          <Text color={"teal"} fontSize={18} fontWeight="bold">
            Language Test
          </Text>
          <Stack spacing={4} mt="5">
            <Grid flexGrow={1} flexDir="column" gap={4}>
              <GridItem direction="row">
                <HStack spacing={"150px"}>
                  <Radio value="1" bgColor={"white"}>
                    Duolingo
                  </Radio>
                  <Radio value="2" bgColor={"white"}>
                    IELTS
                  </Radio>
                </HStack>
              </GridItem>
              <GridItem direction="row">
                <HStack spacing={"150px"}>
                  <Radio value="1" bgColor={"white"}>
                    Duolingo
                  </Radio>
                  <Radio value="2" bgColor={"white"}>
                    IELTS
                  </Radio>
                </HStack>
              </GridItem>
            </Grid>
            <HStack justifyContent={"space-between"}>
              <Flex width={"30%"}>
                <Text color={"blackAlpha.800"}>Test Date</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="row" gap={2}>
                <Input
                  type={"date"}
                  placeholder="Full Name"
                  size="md"
                  background={"white"}
                />
              </Flex>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Flex width={"30%"}>
                <Text color={"blackAlpha.800"}>Score</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="row" gap={2}>
                <Input placeholder="Full Name" size="md" background={"white"} />
              </Flex>
            </HStack>
          </Stack>
        </GridItem>
      </Grid>

      <Grid
        templateColumns={["repeat(1, 1fr)", "repeat(1, 1fr)", "repeat(5, 1fr)"]}
        m={4}
        bg={"blackAlpha.100"}
        borderRadius={6}
        overflow="hidden"
        gap={5}
      >
        <GridItem colSpan={[1, 1, 5]} bg="teal" p="1" px="4">
          <Text color={"white"}>Academic</Text>
        </GridItem>
        <GridItem colSpan={[1, 1, 3]} p="4"></GridItem>
        <GridItem p="4" colSpan={[1, 1, 2]}>
          <Text color={"teal"} fontSize={18} fontWeight="bold">
            Standardised Test
          </Text>
          <Stack spacing={4} mt="5">
            <Grid flexGrow={1} flexDir="column" gap={4}>
              <GridItem direction="row">
                <HStack spacing={"150px"}>
                  <Radio value="1" bgColor={"white"}>
                    ACT
                  </Radio>
                  <Radio value="2" bgColor={"white"}>
                    GMAT
                  </Radio>
                </HStack>
              </GridItem>
              <GridItem direction="row">
                <HStack spacing={"150px"}>
                  <Radio value="1" bgColor={"white"}>
                    GRE
                  </Radio>
                  <Radio value="2" bgColor={"white"}>
                    SAT
                  </Radio>
                </HStack>
              </GridItem>
            </Grid>
            <HStack justifyContent={"space-between"}>
              <Flex width={"30%"}>
                <Text color={"blackAlpha.800"}>Test Date</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="row" gap={2}>
                <Input
                  type={"date"}
                  placeholder="Full Name"
                  size="md"
                  background={"white"}
                />
              </Flex>
            </HStack>
            <HStack justifyContent={"space-between"}>
              <Flex width={"30%"}>
                <Text color={"blackAlpha.800"}>Score</Text>
              </Flex>
              <Flex flexGrow={1} flexDir="row" gap={2}>
                <Input placeholder="Full Name" size="md" background={"white"} />
              </Flex>
            </HStack>
          </Stack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Analysis;
