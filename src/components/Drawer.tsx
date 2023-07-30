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
// import AvancedSettings from "./AdvancedSettings";
import Statistics from "./Statistics";

type DrawerMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

function DrawerMenu({ isOpen, onClose }: DrawerMenuProps) {
  return (
    <>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="30%">
          <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>

          <DrawerBody>
            <Tabs isFitted variant="enclosed">
              <TabList mb="1em">
                {/* <Tab>Avanced Settings</Tab> */}
                <Tab>Statistics(β)</Tab>
              </TabList>
              <TabPanels>
                {/* <TabPanel>
                  <AvancedSettings />
                </TabPanel> */}
                <TabPanel>
                  <Statistics />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
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
