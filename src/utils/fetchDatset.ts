import { InputNode, InputLink, NodesSchema, LinksSchema } from "../types/graph";

async function fetchFile(path: string) {
  const response = await fetch(path);
  return (await response.json()) as object;
}

async function fetchNode(datasetUrl: string) {
  const nodes: InputNode[] = [];
  const nodeFile = await fetchFile(datasetUrl);
  const id2Node = new Map<string, string>();
  try {
    const parsedNodes = NodesSchema.parse(nodeFile);
    parsedNodes.forEach((node) => {
      const id = JSON.stringify(node);
      id2Node.set(node.id, id);
      nodes.push({
        ...node,
        id,
      });
    });
  } catch (error) {
    console.warn(error);
  }
  return { nodes, id2Node };
}

async function fetchLink(datasetUrl: string, id2Node: Map<string, string>) {
  const links: InputLink[] = [];
  const linkFile = await fetchFile(datasetUrl);
  try {
    const parsedLinks = LinksSchema.parse(linkFile);
    parsedLinks.forEach((link) => {
      const source = id2Node.get(link.source);
      const target = id2Node.get(link.target);
      if (source !== undefined && target !== undefined) {
        links.push({
          source: source,
          target: target,
          weight: link.weight,
        });
      }
    });
  } catch (error) {
    console.warn(error);
  }
  return links;
}

export { fetchNode, fetchLink };
