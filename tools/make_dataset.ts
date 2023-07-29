import { readFileSync, writeFileSync } from "fs";
import { createHash } from "crypto";
import {
  LinkSchema,
  LinksSchema,
  NodeSchema,
  NodesSchema,
  InputLink,
  InputNode,
} from "../src/types/graph.ts";

function writeJson(fileName: string, data: object) {
  writeFileSync(fileName, JSON.stringify(data, null, 2));
}

function normalize(links: InputLink[]) {
  const getMax = (arr: number[]) =>
    arr.reduce((max, v) => (max >= v ? max : v), -Infinity);
  const getMin = (arr: number[]) =>
    arr.reduce((min, v) => (min <= v ? min : v), Infinity);
  const min = getMin(links.map((link) => link.weight));
  const max = getMax(links.map((link) => link.weight));

  return links.map((link) => {
    const normalized = (link.weight - min) / (max - min);
    const sigmoided = Number((1 / (1 + Math.exp(-normalized))).toFixed(5));
    return {
      ...link,
      weight: sigmoided,
    };
  });
}

function makeLinks() {
  console.log(`--- Links ---`);
  const dummyEdge = JSON.parse(
    readFileSync("tools/edges.json", "utf8"),
  ) as object[];

  try {
    dummyEdge.forEach((edge: object) => {
      LinkSchema.parse(edge);
    });
    const parsedLinks = LinksSchema.parse(dummyEdge);
    const normalizedLinks = normalize(parsedLinks);
    writeJson("public/edges.json", normalizedLinks);
    writeJson("public/dummy.edges.json", normalizedLinks);
  } catch (error) {
    console.warn(error);
  }
}

const sha256 = (str: string) => {
  const hash = createHash("sha256").update(str);
  return hash.digest("hex");
};

function addColor(nodes: InputNode[]) {
  const server2Color = new Map<string, string | undefined>([
    ["", undefined],
    ["nginx", "#6f1cb7"],
  ]);
  const colored = nodes.map((node) => {
    const { server } = node;
    if (server2Color.has(server)) {
      return {
        ...node,
        color: server2Color.get(server),
      };
    } else {
      const color = `#${sha256(server).slice(-6)}`;
      server2Color.set(server, color);
      return {
        ...node,
        color,
      };
    }
  });
  return colored;
}

function makeNodes() {
  console.log(`--- Nodes ---`);
  const dummyNode = JSON.parse(
    readFileSync("tools/nodes.json", "utf8"),
  ) as object[];
  try {
    dummyNode.forEach((node: object) => {
      NodeSchema.parse(node);
    });
    const parsedNodes = NodesSchema.parse(dummyNode);
    const coloredNodes = addColor(parsedNodes);
    const mask = (str: string) =>
      str.slice(0, 8) + "?".repeat(Math.max(str.length - 8, 0));
    const maskedNodes = coloredNodes.map((node) => ({
      ...node,
      server: node.server,
      domain: mask(node.domain),
    }));
    writeJson("public/nodes.json", coloredNodes);
    writeJson("public/dummy.nodes.json", maskedNodes);
  } catch (error) {
    console.warn(error);
  }
}

makeLinks();
makeNodes();
