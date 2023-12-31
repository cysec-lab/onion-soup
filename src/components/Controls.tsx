import { Graph, GraphConfigInterface } from "@cosmograph/cosmos";
import { InputLink, InputNode } from "../types/graph";
import {
  FormLabel,
  Box,
  Switch,
  Stack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { HamburgerIcon } from "@chakra-ui/icons";
import DrawerMenu from "./Drawer";
import { GraphContext } from "../context/GraphContext";

type NodeSizeProps = {
  graph: Graph<InputNode, InputLink> | null;
  config: GraphConfigInterface<InputNode, InputLink>;
};

const NodeSizeSlider = ({ graph, config }: NodeSizeProps) => {
  const [sliderValue, setSliderValue] = useState(5);
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <Slider
      id="slider"
      defaultValue={sliderValue}
      min={1}
      max={20}
      colorScheme="blue"
      onChange={(v) => {
        setSliderValue(v);
        config.nodeSize = v / 10;
        graph?.setConfig(config);
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg="teal.500"
        color="white"
        placement="top"
        isOpen={showTooltip}
        label={`${Math.floor(sliderValue) / 10}`}
      >
        <SliderThumb />
      </Tooltip>
    </Slider>
  );
};

type ControlsProps = {
  loading: boolean;
  config: GraphConfigInterface<InputNode, InputLink>;
};

const Controls = ({ loading, config }: ControlsProps) => {
  const { graph } = useContext(GraphContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w="100%" p={4} bg="#252525" position={"fixed"} top="0">
      <DrawerMenu isOpen={isOpen} onClose={onClose} />
      <Stack direction="row">
        <Box textAlign="center">
          <IconButton
            aria-label="Open Menu"
            variant="outline"
            mr="10px"
            size="lg"
            borderColor="#eee"
            _hover={{ bg: "#252525" }}
            icon={<HamburgerIcon color="white" />}
            onClick={onOpen}
            isDisabled={loading}
          />
        </Box>
        <Box textAlign="center">
          <FormLabel
            htmlFor="simulate"
            mb="0"
            textColor={"#eee"}
            ml="auto"
            mr="auto"
          >
            Simulate
          </FormLabel>
          <Switch
            defaultChecked
            isDisabled={loading}
            colorScheme="blue"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked) {
                graph?.restart();
              } else {
                graph?.pause();
              }
            }}
          />
        </Box>
        <Box textAlign="center">
          <FormLabel
            htmlFor="render-links"
            mb="0"
            textColor={"#eee"}
            ml="auto"
            mr="auto"
          >
            Render Links
          </FormLabel>
          <Switch
            isDisabled={loading}
            colorScheme="blue"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              config.renderLinks = e.target.checked;
              graph?.setConfig(config);
            }}
          />
        </Box>
        <Box textAlign="center">
          <FormLabel
            htmlFor="fpsmonitor"
            mb="0"
            textColor={"#eee"}
            ml="auto"
            mr="auto"
          >
            FPS Monitor
          </FormLabel>
          <Switch
            defaultChecked
            isDisabled={loading}
            colorScheme="blue"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              config.showFPSMonitor = e.target.checked;
              graph?.setConfig(config);
            }}
          />
        </Box>
        <Box textAlign="center">
          <FormLabel
            htmlFor="darkmode"
            mb="0"
            textColor={"#eee"}
            ml="auto"
            mr="auto"
          >
            Dark Mode
          </FormLabel>
          <Switch
            defaultChecked
            isDisabled={loading}
            colorScheme="blue"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.checked && darkMode) return;
              if (!e.target.checked && !darkMode) return;
              toggleDarkMode();
              config.backgroundColor = e.target.checked ? "#151515" : "#ddd";
              graph?.setConfig(config);
            }}
          />
        </Box>
        <Box textAlign="center">
          <FormLabel
            htmlFor="nodesize"
            mb="0"
            textColor={"#eee"}
            ml="auto"
            mr="auto"
          >
            Node Size
          </FormLabel>
          <NodeSizeSlider graph={graph} config={config} />
        </Box>
      </Stack>
    </Box>
  );
};

export default Controls;
