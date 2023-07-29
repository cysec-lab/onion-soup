import fs from "fs";

const NODE_SIZE = 43000;
const EDGE_RATE = 16;

function writeJson(path: string, data: object) {
  fs.writeFileSync(path, JSON.stringify(data));
}

type NodeT = {
  id: number;
  server: string;
  domain: string;
};

const nodes: NodeT[] = [];
for (let i = 0; i < NODE_SIZE; i++) {
  nodes.push({
    id: i,
    server: `server${i}`,
    domain: `domain${i}`,
  });
}

type EdgeT = {
  source: number;
  target: number;
  weight: number;
};

const edges: EdgeT[] = [];

const map = new Map();

for (let i = 0; i < NODE_SIZE; i++) {
  for (let j = 0; j < EDGE_RATE; j++) {
    if (i === j || i == 0) continue;
    const source = i;
    let target = Math.floor(Math.random() * i);
    for (let _ = 0; !map.has(`${source}-${target}`) && _ < 100; _++) {
      target = Math.floor(Math.random() * i);
    }
    map.set(`${source}-${target}`, true);
    edges.push({
      source: source,
      target: target,
      weight: Math.random(),
    });
  }
}

writeJson("../public/big.dummy.nodes.json", nodes);
writeJson("../public/big.dummy.edges.json", edges);
