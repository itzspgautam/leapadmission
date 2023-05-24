import React from "react";
import { useRouter } from "next/router";

const InvestInfo = ({ params }) => {
  const router = useRouter();
  const { id } = router.query;
  return <div>{id}</div>;
};

export default InvestInfo;
