import { createContext, useState } from "react";
import { InputNode, InputLink } from "../types/graph";

const NodeLinkContext = createContext({
  nodes: [] as InputNode[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNodes: (_nodes: InputNode[]) => {},
  nodeSize: null as number | null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNodeSize: (_size: number) => {},
  links: [] as InputLink[],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLinks: (_links: InputLink[]) => {},
  linkSize: null as number | null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setLinkSize: (_size: number) => {},
});

function NodeLinkProvider(props: { children: React.ReactNode }) {
  const [nodes, setNodes] = useState<InputNode[]>([]);
  const [nodeSize, setNodeSize] = useState<number | null>(null);
  const [links, setLinks] = useState<InputLink[]>([]);
  const [linkSize, setLinkSize] = useState<number | null>(null);

  return (
    <div>
      <NodeLinkContext.Provider
        value={{
          nodes,
          setNodes,
          nodeSize,
          setNodeSize,
          links,
          setLinks,
          linkSize,
          setLinkSize,
        }}
      >
        {props.children}
      </NodeLinkContext.Provider>
    </div>
  );
}
export { NodeLinkContext, NodeLinkProvider };
