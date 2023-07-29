import { Graph, GraphConfigInterface } from "@cosmograph/cosmos";
import { useEffect, useState } from "react";
import { InputLink, InputNode } from "../types/graph";
import { fetchLink, fetchNode } from "../utils/fetchDatset";
import Controls from "./Controls";
import Status from "./Status";
import Loading from "./Loading";
import NodeInfo from "./NodeInfo";

function drawGraph(
  nodes: InputNode[],
  links: InputLink[],
  config: GraphConfigInterface<InputNode, InputLink>,
) {
  const canvas = document.createElement("canvas");
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }
  document.getElementById("cosmos")?.appendChild(canvas);

  const graph = new Graph(canvas, config);
  graph.setData(nodes, links);

  return graph;
}

function Cosmos() {
  // Cosmos state
  const [graph, setGraph] = useState<Graph<InputNode, InputLink> | null>(null);
  const [nodeSize, setNodeSize] = useState<number | null>(null);
  const [linkSize, setLinkSize] = useState<number | null>(null);

  // Loading state
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMsg, setLoadingMsg] = useState<string>("Starting up...");

  // NodeInfo state
  const [laseSelected, setLastSelected] = useState<InputNode | null>(null);
  const [lastClicked, setLastClicked] = useState<InputNode | null>(null);

  const config: GraphConfigInterface<InputNode, InputLink> = {
    backgroundColor: "#151515",
    nodeSize: 0.5,
    nodeColor: (node) => node.color ?? "#666",
    linkWidth: (link) => link.weight * 3,
    renderLinks: false,
    showFPSMonitor: true,
    events: {
      onClick: (node) => {
        node && setLastClicked(node);
      },
      onNodeMouseOver: (node) => {
        setLastSelected(node);
      },
    },
    simulation: {
      repulsion: 2.5,
      center: 1.0,
      gravity: 0.8,
    },
  };

  useEffect(() => {
    const getNodesLinks = async () => {
      setLoadingMsg("Loading Nodes...");
      const nodeFileName =
        import.meta.env.MODE === "production"
          ? "/dummy.nodes.json"
          : "/nodes.json";
      const nodeInfo = await fetchNode(nodeFileName);

      setLoadingMsg("Loading Links...");
      const linksFileName =
        import.meta.env.MODE === "production"
          ? "/dummy.edges.json"
          : "/edges.json";
      const links = await fetchLink(linksFileName, nodeInfo.id2Node);
      return { nodes: nodeInfo.nodes, links };
    };
    getNodesLinks()
      .then(({ nodes, links }) => {
        setLoadingMsg("Drawing Graph...");
        const g = drawGraph(nodes, links, config);
        setNodeSize(nodes.length);
        setLinkSize(links.length);
        setGraph(g);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <Controls loading={loading} graph={graph} config={config} />
      <Status nodeSize={nodeSize} linkSize={linkSize} />
      <Loading loading={loading} message={loadingMsg} />
      <NodeInfo
        loading={loading}
        lastSelected={laseSelected}
        lastClicked={lastClicked}
      />
      <div id="cosmos"></div>
    </div>
  );
}

export default Cosmos;
