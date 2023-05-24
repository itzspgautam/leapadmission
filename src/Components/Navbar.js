import { Images } from "@/Constants";
import UserActions from "@/State/Actions/UserActions";
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  AiFillBell,
  AiFillNotification,
  AiOutlineHome,
  AiOutlineInfo,
  AiOutlinePhone,
  AiOutlineTable,
  AiOutlineYoutube,
} from "react-icons/ai";
import {
  IoLogoAppleAppstore,
  IoLogoGooglePlaystore,
  IoNotifications,
} from "react-icons/io5";
import { FaBell, FaChevronDown } from "react-icons/fa";

import { TbAlignLeft } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import LoginDrawer from "./Auth/LoginDrawer";
import NavDrawer from "./Drawer";
import Colors from "@/Constants/Colors";
import { BsBell } from "react-icons/bs";

const NavPages = [
  { _id: 1, title: "Home", link: "/", icon: <AiOutlineHome /> },
  { _id: 3, title: "Invest", link: "/invest", icon: <AiOutlineInfo /> },

  { _id: 4, title: "About Us", link: "/about", icon: <AiOutlineInfo /> },
  { _id: 5, title: "Contacts", link: "/contacts", icon: <AiOutlinePhone /> },
];

// {
//   _id: 2,
//   title: "Test Prep",
//   link: "/preps",
//   icon: <AiOutlineTable />,
//   hasChildren: true,
//   children: [
//     {
//       _id: "2_1",
//       title: "IELTS",
//       link: "/preps/63ec1441b56829f963751950",
//       icon: <AiOutlineYoutube />,
//       hasChildren: true,
//       children: [
//         {
//           _id: "2_1_1",
//           title: "Listening",
//           link: "/preps/63ec1441b56829f963751950",
//           icon: <AiOutlineYoutube />,
//         },
//         {
//           _id: "2_1_2",
//           title: "Reading",
//           link: "/preps/63ec1441b56829f963751950",
//           icon: <AiOutlineYoutube />,
//         },
//         {
//           _id: "2_1_3",
//           title: "Writing",
//           link: "/preps/63ec1441b56829f963751950",
//           icon: <AiOutlineYoutube />,
//         },
//         {
//           _id: "2_1_4",
//           title: "Speaking",
//           link: "/preps/63ec1441b56829f963751950",
//           icon: <AiOutlineYoutube />,
//         },
//         {
//           _id: "2_1_5",
//           title: "Grammer",
//           link: "/preps/63ec1441b56829f963751950",
//           icon: <AiOutlineYoutube />,
//         },
//       ],
//     },
//   ],
// },

const ChildrenList = ({ page }) => {
  const router = useRouter();

  return (
    <>
      {page.hasChildren ? (
        <Popover trigger={"hover"} placement={"bottom-start"}>
          <PopoverTrigger>
            <Link href={page.link} style={{ width: "100%" }}>
              <Text
                color={router.asPath === page.link ? "teal" : "teal.900"}
                fontWeight={router.asPath === page.link ? "semibold" : ""}
              >
                {page.title}
              </Text>
            </Link>
          </PopoverTrigger>
          <PopoverContent
            border={0}
            boxShadow={"xl"}
            p={4}
            rounded={"sm"}
            w={"250px"}
            bg="teal.50"
          >
            <Stack listStyleType={"none"} w="100%" justifyContent={"flex-end"}>
              {page?.children?.map((page) => (
                <Flex
                  key={page._id}
                  _hover={{ bg: "teal.100" }}
                  p="2"
                  borderRadius={"md"}
                  px="2"
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <ChildrenList page={page} />
                  {page.hasChildren && <FaChevronDown size="12" />}
                </Flex>
              ))}
            </Stack>
          </PopoverContent>
        </Popover>
      ) : (
        <Link href={page.link}>
          <Text
            color={router.asPath === page.link ? "teal" : "teal.900"}
            fontWeight={router.asPath === page.link ? "semibold" : ""}
          >
            {page.title}
          </Text>
        </Link>
      )}
    </>
  );
};

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.Auth);
  const logout = () => {
    dispatch(UserActions.logout());
  };
  return (
    <>
      <Center
        display={["none", "none", "flex"]}
        bg={Colors.PRIMARY[500]}
        p="1"
        gap="2"
      >
        <Text color={"white"} fontSize={"sm"}>
          Download app for Android/Ios{" "}
        </Text>
        <Button
          variant={"outline"}
          colorScheme={"gray"}
          color={"white"}
          _hover={{ color: "blue.800", bg: "white" }}
          size="sm"
        >
          <IoLogoGooglePlaystore size={18} />
        </Button>
        <Button
          variant={"outline"}
          colorScheme={"gray"}
          color={"white"}
          _hover={{ color: "blue.800", bg: "white" }}
          size="sm"
        >
          <IoLogoAppleAppstore size={18} />
        </Button>
      </Center>

      <Center
        display={["none", "none", "flex"]}
        justifyContent={"space-between"}
        px={"10vw"}
        py="2"
        boxShadow={"sm"}
        borderBottom="1px solid"
        borderBottomColor={"gray.200"}
        position="sticky"
        top="0"
        bg="rgba(255, 255, 255, .9)"
        backdropFilter={"blur(50px)"}
        gap="10"
        zIndex={2}
      >
        <Link href="/">
          <Image src={Images.LOGO_WIDE} height="45" alt="Logo" />
        </Link>
        <Box display="flex" gap="8" w="100%" justifyContent={"center"}>
          {NavPages.map((page) => (
            <Box key={page._id}>
              <ChildrenList page={page} />
            </Box>
          ))}
        </Box>
        <Center justifyContent={"flex-end"} gap="2">
          <Link href="#">
            <IoNotifications size="30" color={Colors.SECONDARY[900]} />
          </Link>
          {auth?.user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  name={auth?.user.displayName}
                  height={45}
                  width={45}
                  src={auth?.user.avatar}
                  alt="user"
                  borderWidth={"3px"}
                  borderColor="gray.300"
                />
              </MenuButton>
              <MenuList>
                {/* <MenuItem>Profile</MenuItem> */}
                <Link href="/admin">
                  <MenuItem>Admin Dashboard</MenuItem>
                </Link>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href="login">
              <Flex
                alignItems={"center"}
                gap={1}
                p={0.5}
                borderRadius={"full"}
                border={"1px solid"}
                borderColor={Colors.SECONDARY[900]}
                _hover={{
                  background: Colors.SECONDARY[900],
                }}
                height={39}
              >
                <Avatar
                  name="Login/Signup"
                  size={"sm"}
                  src={Images.USER_DEFAULT.default.src}
                  alt="user"
                  background={Colors.SECONDARY[900]}
                />
                <Text
                  color={Colors.SECONDARY[900]}
                  fontSize={"sm"}
                  pr={2}
                  _hover={{ color: Colors.LIGHT[100] }}
                >
                  Login/Signup
                </Text>
              </Flex>
            </Link>
          )}
        </Center>
      </Center>

      <Center
        display={["flex", "flex", "none"]}
        justifyContent={"space-between"}
        px="4"
        py="3"
        boxShadow={"sm"}
        position="sticky"
        top="0"
        bg="rgba(255, 255, 255, .5)"
        backdropFilter={"blur(50px)"}
        zIndex={2}
      >
        <NavDrawer pages={NavPages} path={router.pathname}>
          <TbAlignLeft size={25} />
        </NavDrawer>
        <Link href="/" style={{ height: "35px" }}>
          <Image src={Images.LOGO_WIDE} height="35" alt="logo" />
        </Link>

        <Center justifyContent={"flex-end"} gap="5">
          {auth?.user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  a={console.log(auth?.user?.avatar)}
                  name={auth?.user.displayName}
                  size={"md"}
                  src={auth?.user?.avatar}
                  alt="user"
                  height={45}
                  width={45}
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link href="login">
              <Avatar
                name="Leap Admission User"
                size={"md"}
                src={Images.USER_DEFAULT.default.src}
                alt="user"
                height={45}
                width={45}
              />
            </Link>
          )}
        </Center>
      </Center>
    </>
  );
};

export default Navbar;
