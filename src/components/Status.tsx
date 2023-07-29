import { useContext } from "react";
import {
  Box,
  Spinner,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import { DarkModeContext } from "../context/DarkModeContext";

type StatusProps = {
  nodeSize: number | null;
  linkSize: number | null;
};

const Status = ({ nodeSize, linkSize }: StatusProps) => {
  const { darkMode } = useContext(DarkModeContext);
  const textColor = darkMode ? "#eee" : "#333";
  return (
    <Box position="fixed" bottom="0" color={textColor}>
      <StatGroup>
        <Stat ml="5px" mr="5px">
          <StatLabel>Nodes</StatLabel>
          <StatNumber>{nodeSize === null ? <Spinner /> : nodeSize}</StatNumber>
        </Stat>
        <Stat ml="5px" mr="5px">
          <StatLabel>Links</StatLabel>
          <StatNumber>{linkSize === null ? <Spinner /> : linkSize}</StatNumber>
        </Stat>
      </StatGroup>
    </Box>
  );
};

export default Status;
