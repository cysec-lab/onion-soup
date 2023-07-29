import { useContext } from "react";
import { InputNode } from "../types/graph";
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  ListItem,
  Stack,
  HStack,
  Tag,
  TagLabel,
  Text,
  UnorderedList,
  ToastProps,
  useToast,
} from "@chakra-ui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { DarkModeContext } from "../context/DarkModeContext";

const TagIcon = ({ text }: { text: string }) => {
  return (
    <Tag size="sm" variant="outline" colorScheme="blue" minW="5em">
      <TagLabel ml="auto" mr="auto">
        {text}
      </TagLabel>
    </Tag>
  );
};

const NA = () => <p style={{ color: "#666" }}>N/A</p>;

const handleCopy = async (toast: (_: ToastProps) => void, value: string) => {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(value);
    toast({
      status: "info",
      title: "Copied!",
      position: "bottom",
      duration: 2000,
      isClosable: true,
    });
  } else {
    console.error("Clipboard API not available");
  }
};

const NodeAccodionIten = ({
  node,
  title,
}: {
  node: InputNode | null;
  title: string;
}) => {
  const toast = useToast();
  const domain = node?.domain ?? <NA />;
  const server = node === null || node.server === "" ? <NA /> : node.server;
  return (
    <>
      <Text fontWeight="bold">{title}</Text>
      <Stack direction="row" p={4}>
        <Divider orientation="vertical" h="3em" />
        <UnorderedList styleType="none" ml="4px" w="100%">
          <ListItem>
            <HStack>
              <TagIcon text={"Domain"} />
              <Box
                overflowX="scroll"
                whiteSpace="nowrap"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                onClick={async () => {
                  if (node && node.domain) {
                    toast.closeAll();
                    await handleCopy(toast, node.domain);
                  }
                }}
              >
                {domain}
              </Box>
            </HStack>
          </ListItem>
          <ListItem>
            <HStack>
              <TagIcon text={"Server"} />
              <Box
                overflowX="scroll"
                whiteSpace="nowrap"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
                onClick={async () => {
                  if (node && node.server.length > 0) {
                    toast.closeAll();
                    await handleCopy(toast, node.server);
                  }
                }}
              >
                {server}
              </Box>
            </HStack>
          </ListItem>
        </UnorderedList>
      </Stack>
    </>
  );
};

type NodeInfoProps = {
  loading: boolean;
  lastSelected: InputNode | null;
  lastClicked: InputNode | null;
};

const NodeInfo = ({ loading, lastSelected, lastClicked }: NodeInfoProps) => {
  const { darkMode } = useContext(DarkModeContext);
  const textColor = darkMode ? "#eee" : "#333";
  const loadingColor = (color: string) => (loading ? "#666" : color);
  return (
    <Box
      position="fixed"
      bottom="0"
      right="0"
      w="30%"
      color={textColor}
      style={{ backdropFilter: "blur(5px)" }}
    >
      <Accordion allowToggle>
        <AccordionItem
          borderColor={loadingColor(textColor)}
          isDisabled={loading}
        >
          {({ isExpanded }) => (
            <>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left" color={textColor}>
                    Show Node Info
                  </Box>
                  {isExpanded ? <ChevronDownIcon /> : <ChevronUpIcon />}
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <NodeAccodionIten node={lastSelected} title={"Selected"} />
                <NodeAccodionIten node={lastClicked} title={"Clicked"} />
              </AccordionPanel>
            </>
          )}
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default NodeInfo;
