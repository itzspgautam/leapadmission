import { IconButton } from "@chakra-ui/react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Whatsapp = () => {
  return (
    <IconButton
      colorScheme={"whatsapp"}
      rounded="full"
      h="12"
      w="12"
      position={"fixed"}
      bottom="10"
      right="10"
      zIndex={10}
    >
      <FaWhatsapp size="35" />
    </IconButton>
  );
};

export default Whatsapp;
