import { Images } from "@/Constants";
import Colors from "@/Constants/Colors";
import {
  Badge,
  Box,
  Button,
  Card,
  Center,
  Container,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Spacer,
  Stack,
  StackItem,
  Text,
  useToast,
} from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { IoCheckbox } from "react-icons/io5";
import Login from "../login";
import { useSelector, useDispatch } from "react-redux";
import InvestActions from "@/State/Actions/InvestActions";
import Pay from "@/utils/Razorpay/Pay";
import { useRef } from "react";

const TextInfo = (props) => {
  return (
    <HStack justifyContent={"space-between"} borderBottom={"1px solid #e2e2e2"}>
      <Text color={Colors.DARK[400]} fontSize={"sm"} fontWeight={"light"}>
        {props.title}
      </Text>
      <Text color={Colors.DARK[400]} fontSize={"sm"} fontWeight={"light"}>
        {props.data}
      </Text>
    </HStack>
  );
};

const index = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { config } = useSelector((state) => state.Config);
  const { auth } = useSelector((state) => state.Auth);
  const { investError, investLoading, payLoading, init } = useSelector(
    (state) => state.Invest
  );

  const [paymentType, setPaymentType] = useState("full");
  const [duration, setDuration] = useState();
  const [amount, setAmount] = useState("");
  const [payAmount, setPayAmount] = useState(0);
  const [emiDuration, setEmiDuration] = useState(2);

  const months = Array.from(
    { length: config?.invest.maxDuration / 12 },
    (_, i) => i + 1
  );

  const setAmountString = (text) => {
    let newText = "";
    let numbers = "0123456789";
    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      }
    }
    setAmount(newText);
    setPayAmount(parseFloat(newText));
  };

  const payAndInvest = async () => {
    const investData = {
      amount,
      duration:duration*12,
      paymentType,
      intrest:
        paymentType === "full"
          ? config?.invest.FullIntrest
          : config?.invest.EmiIntrest,
      emiDuration: paymentType === "full" ? 1 : emiDuration,
      payAmount,
      auth,
    };
    dispatch(InvestActions.createInvest(investData, navigation));
  };

  useEffect(() => {
    investError &&
      toast({
        title: "Error",
        description: investError,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
        variant: "top-accent",
      });
  }, [investError]);

  return (
    <Login>
      <Center pt={[5, 10, 20, 30]} pb={"100vh"} px={2} bg={Colors.LIGHT[300]}>
        <Container bgColor="white" maxW="md" p={2} borderRadius={5}>
          {init?.order === null && (
            <>
              <Stack gap={2}>
                <Image
                  src={Images.MISSION_VISSION_BG}
                  style={{ aspectRatio: 5 / 1, borderRadius: 2 }}
                />

                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    fontSize="1.2em"
                    children="₹"
                  />
                  <Input
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmountString(e.target.value)}
                  />
                </InputGroup>

                <InputGroup>
                  <Select
                    placeholder="Select Duration in Year"
                    onChange={(e) => setDuration(e.target.value)}
                  >
                    {months.map((y) => (
                      <option>{y}</option>
                    ))}
                  </Select>
                </InputGroup>

                {parseFloat(amount) > 0 && duration && (
                  <>
                    <HStack>
                      <Button
                        p={1}
                        w="100%"
                        leftIcon={<IoCheckbox size={30} />}
                        colorScheme="teal"
                        variant="solid"
                        background={
                          paymentType === "full"
                            ? Colors.PRIMARY[400]
                            : Colors.LIGHT[500]
                        }
                        borderRadius={2}
                        justifyContent={"flex-start"}
                        fontWeight={"regular"}
                        onClick={() => setPaymentType("full")}
                      >
                        Pay In Full
                      </Button>
                      <Button
                        p={1}
                        w="100%"
                        leftIcon={<IoCheckbox size={30} />}
                        colorScheme="blackAlpha"
                        variant="solid"
                        background={
                          paymentType === "emi"
                            ? Colors.PRIMARY[400]
                            : Colors.LIGHT[500]
                        }
                        borderRadius={2}
                        justifyContent={"flex-start"}
                        fontWeight={"regular"}
                        onClick={() => setPaymentType("emi")}
                      >
                        Pay In EMI
                      </Button>
                    </HStack>
                    <Box bgColor={Colors.LIGHT[300]} p={2} borderRadius={2}>
                      <Box bgColor={Colors.LIGHT[100]} p={1} borderRadius={2}>
                        <Text
                          color={Colors.PRIMARY[500]}
                          fontSize={"md"}
                          fontWeight={"medium"}
                        >
                          Annual Intrest Rate:{" "}
                          {paymentType === "full"
                            ? `${config?.invest.FullIntrest}%`
                            : `${config?.invest.EmiIntrest}%`}
                        </Text>
                      </Box>

                      {paymentType === "emi" && (
                        <Box>
                          <Spacer h={2} />
                          <HStack justifyContent={"space-between"}>
                            <Text
                              color={Colors.PRIMARY[500]}
                              fontSize={"md"}
                              fontWeight={"medium"}
                            >
                              Select Month
                            </Text>
                            <Badge colorScheme="teal">
                              Selected:{emiDuration} Months
                            </Badge>
                          </HStack>
                          <Slider
                            my={4}
                            aria-label=""
                            colorScheme="teal"
                            defaultValue={config?.invest.MaxEmiMonth - 1}
                            step={1}
                            max={config?.invest.MaxEmiMonth}
                            min={config?.invest.MinEmiMonth}
                            onChange={(e) => setEmiDuration(e)}
                          >
                            <SliderTrack height={2}>
                              <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb size={10} />
                          </Slider>
                          <Box
                            borderRadius={2}
                            overflow={"hidden"}
                            border={"2px solid"}
                            borderColor={Colors.PRIMARY[500]}
                            bgColor={Colors.LIGHT[100]}
                          >
                            <Box bgColor={Colors.PRIMARY[500]}>
                              <Text
                                color={Colors.LIGHT[100]}
                                fontSize={"md"}
                                fontWeight={"medium"}
                                textAlign={"center"}
                              >
                                EMI Breakouts
                              </Text>
                            </Box>

                            <Stack spacing={1} p="2">
                              {emiDuration}
                              {Array(emiDuration)
                                .fill(0)
                                .map((_, i) => (
                                  <TextInfo
                                    key={i}
                                    title={`Month ${i + 1}`}
                                    data={`₹ ${Math.ceil(
                                      amount / emiDuration
                                    )}`}
                                  />
                                ))}
                            </Stack>
                          </Box>
                          <Spacer h={2} />
                        </Box>
                      )}
                      <Stack spacing={1}>
                        <TextInfo title={"Amount:"} data={`₹${amount}`} />
                        <TextInfo
                          title={"Selected Duration:"}
                          data={`${duration} Years (${duration * 12} Months)`}
                        />
                        <TextInfo
                          title={`Net Profit after ${duration} years`}
                          data={`₹ ${
                            ((paymentType === "full"
                              ? config?.invest.FullIntrest * duration
                              : config?.invest.EmiIntrest * duration) /
                              100) *
                            amount
                          }`}
                        />
                      </Stack>
                    </Box>
                  </>
                )}
              </Stack>
              <Button
                colorScheme="teal"
                bgColor={Colors.LIGHT[500]}
                borderRadius={2}
                width={"100%"}
                size={"sm"}
                variant={"solid"}
                mt={10}
                onClick={payAndInvest}
                isLoading={investLoading}
              >
                Invest Now
              </Button>
            </>
          )}

          {init?.order && (
            <>
              <Stack spacing={1}>
                <TextInfo
                  title={"Investment ID:"}
                  data={init?.investment._id}
                />
                <TextInfo title={"Amount:"} data={`₹${amount}`} />
                <TextInfo
                  title={"Duration:"}
                  data={`${duration} Years (${duration * 12} Months)`}
                />
                <TextInfo
                  title={`Net Profit after ${duration} years`}
                  data={`₹ ${
                    ((paymentType === "full"
                      ? config?.invest.FullIntrest * duration
                      : config?.invest.EmiIntrest * duration) /
                      100) *
                    amount
                  }`}
                />
                <TextInfo
                  title={"Payment Type:"}
                  data={paymentType.toUpperCase()}
                />
                <TextInfo title={"payable Amount:"} data={`₹${payAmount}`} />
              </Stack>
              <Pay order={init?.order} investment={init?.investment}>
                <Button
                  colorScheme="teal"
                  bgColor={Colors.LIGHT[500]}
                  borderRadius={2}
                  width={"100%"}
                  size={"sm"}
                  variant={"solid"}
                  mt={10}
                  isLoading={payLoading}
                >
                  Proceed to payment
                </Button>
              </Pay>
            </>
          )}
        </Container>
      </Center>
    </Login>
  );
};

export default index;
