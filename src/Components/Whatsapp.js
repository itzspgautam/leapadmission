import { IconButton } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <Link href="https://wa.me/+17328616559" target="_blank">
      <IconButton
        colorScheme={"whatsapp"}
        rounded="full"
        h="12"
        w="12"
        position={"fixed"}
        bottom={["5", "10"]}
        right={["5", "10"]}
        zIndex={10}
      >
        <FaWhatsapp size="35" />
      </IconButton>
    </Link>
  );
};

export default Whatsapp;
