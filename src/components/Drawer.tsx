import {
  Button,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import Statistics from "./AllNodes";
import { useContext, useState } from "react";
import { GraphContext } from "../context/GraphContext";
import { Graph } from "@cosmograph/cosmos";
import { InputLink, InputNode } from "../types/graph";
import { NodeLinkContext } from "../context/NodeLinkContext";

type DrawerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type ServerT = string;

export type DisabledNodesT = {
  [key: ServerT]: boolean;
};

const applyAdvancedSettings = (
  graph: Graph<InputNode, InputLink> | null,
  disabledNodes: DisabledNodesT,
  nodes: InputNode[],
  links: InputLink[],
) => {
  const newNodes = nodes
    .map((node) => (node.server in disabledNodes ? undefined : node))
    .filter((node) => node !== undefined) as InputNode[];
  graph?.setData(newNodes, links);
  console.log(disabledNodes);
};

function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  const [disabledNodes, setDisabledNodes] = useState<DisabledNodesT>({});
  const [canApply, setCanApply] = useState<boolean>(false);
  const { graph } = useContext(GraphContext);
  const { nodes, links } = useContext(NodeLinkContext);
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="30%">
          <DrawerHeader borderBottomWidth="1px">Avanced Settings</DrawerHeader>

          <DrawerBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                <Tab>All Nodes(β)</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Statistics
                    disabledNodes={disabledNodes}
                    setDisabledNodes={setDisabledNodes}
                    setCanApply={setCanApply}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            {canApply ? (
              <Button
                variant="outline"
                mr={3}
                colorScheme="blue"
                onClick={() => {
                  setCanApply(false);
                  applyAdvancedSettings(graph, disabledNodes, nodes, links);
                  onClose();
                }}
              >
                Apply
              </Button>
            ) : (
              <></>
            )}
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerMenu;
