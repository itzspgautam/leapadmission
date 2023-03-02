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
  AiOutlineHome,
  AiOutlineInfo,
  AiOutlinePhone,
  AiOutlineTable,
  AiOutlineYoutube,
} from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { RiPhoneFill, RiSearch2Line } from "react-icons/ri";
import { TbAlignLeft } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import LoginDrawer from "./Auth/LoginDrawer";
import NavDrawer from "./Drawer";

const NavPages = [
  { _id: 1, title: "Home", link: "/", icon: <AiOutlineHome /> },
  { _id: 3, title: "Mentors", link: "/mentor", icon: <AiOutlineInfo /> },

  {
    _id: 2,
    title: "Test Prep",
    link: "/preps",
    icon: <AiOutlineTable />,
    hasChildren: true,
    children: [
      {
        _id: "2_1",
        title: "IELTS",
        link: "/preps/63ec1441b56829f963751950",
        icon: <AiOutlineYoutube />,
        hasChildren: true,
        children: [
          {
            _id: "2_1_1",
            title: "Listening",
            link: "/preps/63ec1441b56829f963751950",
            icon: <AiOutlineYoutube />,
          },
          {
            _id: "2_1_2",
            title: "Reading",
            link: "/preps/63ec1441b56829f963751950",
            icon: <AiOutlineYoutube />,
          },
          {
            _id: "2_1_3",
            title: "Writing",
            link: "/preps/63ec1441b56829f963751950",
            icon: <AiOutlineYoutube />,
          },
          {
            _id: "2_1_4",
            title: "Speaking",
            link: "/preps/63ec1441b56829f963751950",
            icon: <AiOutlineYoutube />,
          },
          {
            _id: "2_1_5",
            title: "Grammer",
            link: "/preps/63ec1441b56829f963751950",
            icon: <AiOutlineYoutube />,
          },
        ],
      },
    ],
  },

  { _id: 4, title: "About Us", link: "/about", icon: <AiOutlineInfo /> },
  { _id: 5, title: "Contacts", link: "/contacts", icon: <AiOutlinePhone /> },
];

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
  const { user } = useSelector((state) => state.User);
  const logout = () => {
    dispatch(UserActions.logout());
  };
  return (
    <>
      <Center display={["none", "none", "flex"]} bg="blue.900" p="2" gap="2">
        <Text color={"white"}>Get Scholarship </Text>
        <Button
          variant={"outline"}
          colorScheme={"gray"}
          color={"white"}
          _hover={{ color: "blue.800", bg: "white" }}
          size="sm"
        >
          Learn More
        </Button>
      </Center>

      <Center
        display={["none", "none", "flex"]}
        justifyContent={"space-between"}
        px="14"
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
        <Link href="/" style={{ height: "35px", width: "40%" }}>
          <Image src={Images.LOGO_WIDE} height="35" alt="LeapAdmission Logo" />
        </Link>
        <Box display="flex" gap="8" w="100%" justifyContent={"flex-end"}>
          {NavPages.map((page) => (
            <Box key={page._id}>
              <ChildrenList page={page} />
            </Box>
          ))}
        </Box>
        <Center justifyContent={"flex-end"} gap="8">
          <Center
            w="300px"
            bg="blue.50"
            justifyContent={"flex-start"}
            gap="3"
            p="1.5"
            borderRadius={"md"}
            px="2"
            h="10"
            cursor={"pointer"}
          >
            <Text color={"gray.400"}>
              <RiSearch2Line size={20} />
            </Text>
            <Text color={"gray.400"}>Search Something</Text>
          </Center>
          <Link href="tel:+1-860-209-8792">
            <Button colorScheme="teal" h="10">
              <RiPhoneFill size="20" />
            </Button>
          </Link>
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  name={user.displayName}
                  size={"md"}
                  src={user.photoURL}
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
            <LoginDrawer>
              <Avatar
                name="Leap Admission User"
                size={"md"}
                src={Images.USER_DEFAULT.default.src}
                alt="user"
              />
            </LoginDrawer>
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
          {user ? (
            <Menu>
              <MenuButton>
                <Avatar
                  name={user.displayName}
                  size={"md"}
                  src={user.photoURL}
                  alt="user"
                  borderWidth={"3px"}
                  borderColor="gray.300"
                />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <LoginDrawer>
              <Avatar
                name="Leap Admission User"
                size={"md"}
                src={Images.USER_DEFAULT.default.src}
                alt="user"
              />
            </LoginDrawer>
          )}
        </Center>
      </Center>
    </>
  );
};

export default Navbar;
