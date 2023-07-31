import { NodeLinkContext } from "../context/NodeLinkContext";
import { useContext, useEffect, useState } from "react";
import {
  Stack,
  Input,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { DisabledNodesT, ServerT } from "./Drawer";

type StatVal = {
  color: string;
  count: number;
};

type TmpStatT = {
  server: ServerT;
  stat: StatVal;
}[];

function AllNodes({
  disabledNodes,
  setDisabledNodes,
  setCanApply,
}: {
  disabledNodes: DisabledNodesT;
  setDisabledNodes: (disabledNodes: DisabledNodesT) => void;
  setCanApply: (canApply: boolean) => void;
}) {
  const { nodes } = useContext(NodeLinkContext);
  const stat = new Map<ServerT, StatVal>();
  const [tmpStat, setTmpStat] = useState<TmpStatT>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    nodes.forEach((node) => {
      const server = node.server;
      if (stat.has(server)) {
        const val = stat.get(server);
        if (val) {
          val.count += 1;
        }
      } else {
        const initVal: StatVal = { color: node.color ?? "#666", count: 1 };
        stat.set(server, initVal);
      }
    });
    const tmpStat: TmpStatT = [];
    stat.forEach((val, server) => {
      tmpStat.push({ server, stat: val });
    });
    tmpStat.sort((a, b) => b.stat.count - a.stat.count);
    setTmpStat(tmpStat);
  }, [nodes]);

  return (
    <Stack spacing={3}>
      <Input
        variant="outline"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Stack spacing={3} direction="row">
        <Button
          colorScheme="blue"
          size="xs"
          w="50%"
          isDisabled={Object.keys(disabledNodes).length === tmpStat.length}
          onClick={() => {
            const newDisabledNodes: DisabledNodesT = {};
            tmpStat.forEach(({ server }) => {
              newDisabledNodes[server] = true;
            });
            setDisabledNodes(newDisabledNodes);
            setCanApply(true);
          }}
        >
          <ViewOffIcon mr="2px" />
          All Nodes Disabled
        </Button>
        <Button
          colorScheme="blue"
          size="xs"
          w="50%"
          isDisabled={Object.keys(disabledNodes).length === 0}
          disabled={true}
          onClick={() => {
            setDisabledNodes({});
            setCanApply(true);
          }}
        >
          <ViewIcon mr="2px" />
          All Nodes Enabled
        </Button>
      </Stack>
      {/* FIXME: なんかThのサイズを適当なpxにするとそれなりに綺麗に描画されるが、%にするとだめ、謎 */}
      <TableContainer overflowX="unset" overflowY="unset">
        <Table variant="simple" size="sm">
          <Thead
            position="sticky"
            top={-2}
            zIndex="docked"
            backgroundColor="white"
          >
            <Tr>
              <Th maxW="20px">Domain</Th>
              <Th maxW="20px" isNumeric>
                count
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tmpStat
              .filter(({ server }) =>
                search.length
                  ? server.toLowerCase().includes(search.toLowerCase())
                  : true,
              )
              .map(({ server, stat }) => {
                const isDisabled = disabledNodes?.[server];
                return (
                  <Tr>
                    <Td
                      maxW="20px"
                      overflowX="scroll"
                      textDecoration={isDisabled ? "line-through" : "none"}
                    >
                      <IconButton
                        aria-label="show-node"
                        icon={isDisabled ? <ViewOffIcon /> : <ViewIcon />}
                        size="sm"
                        mr="2px"
                        color={stat.color}
                        onClick={() => {
                          const newDisabledNodes = { ...disabledNodes };
                          if (newDisabledNodes[server] === undefined) {
                            newDisabledNodes[server] = true;
                          } else {
                            delete newDisabledNodes[server];
                          }
                          setDisabledNodes(newDisabledNodes);
                          setCanApply(true);
                        }}
                      />
                      {server.length ? server : "(empty)"}
                    </Td>
                    <Td maxW="20px" isNumeric>
                      {stat.count}
                    </Td>
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
export default AllNodes;
