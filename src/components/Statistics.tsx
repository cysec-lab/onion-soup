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
  Icon,
} from "@chakra-ui/react";

type StatVal = {
  color: string;
  count: number;
};

type Server = string;

type TmpStatT = {
  server: Server;
  stat: StatVal;
}[];

function Statistics() {
  const { nodes } = useContext(NodeLinkContext);
  const stat = new Map<Server, StatVal>();
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

  const Circle = ({ color }: { color: string }) => (
    <Icon viewBox="0 0 200 200" color={color}>
      <path
        fill="currentColor"
        d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
      />
    </Icon>
  );

  return (
    <Stack spacing={3}>
      <Input
        variant="outline"
        placeholder="Search"
        onChange={(e) => setSearch(e.target.value)}
      />
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
              .map(({ server, stat }) => (
                <Tr>
                  <Td maxW="20px" overflowX="scroll">
                    <Circle color={stat.color} />
                    {server.length ? server : "(unknown)"}
                  </Td>
                  <Td maxW="20px" isNumeric>
                    {stat.count}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Stack>
  );
}
export default Statistics;
