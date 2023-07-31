import { Graph, GraphConfigInterface } from "@cosmograph/cosmos";
import { useContext, useEffect, useState } from "react";
import { InputLink, InputNode } from "../types/graph";
import { fetchLink, fetchNode } from "../utils/fetchDatset";
import Controls from "./Controls";
import Status from "./Status";
import Loading from "./Loading";
import NodeInfo from "./NodeInfo";
import { NodeLinkContext } from "../context/NodeLinkContext";
import { GraphContext } from "../context/GraphContext";

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
  // Loading state
  const { setGraph } = useContext(GraphContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMsg, setLoadingMsg] = useState<string>("Starting up...");

  // NodeInfo state
  const [lastSelected, setLastSelected] = useState<InputNode | null>(null);
  const [lastClicked, setLastClicked] = useState<InputNode | null>(null);

  // Nodes and Links context
  const { setNodes, setLinks, setNodeSize, setLinkSize } =
    useContext(NodeLinkContext);

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
        setNodes(nodes);
        setLinks(links);
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
      <Controls loading={loading} config={config} />
      <Status />
      <Loading loading={loading} message={loadingMsg} />
      <NodeInfo
        loading={loading}
        lastSelected={lastSelected}
        lastClicked={lastClicked}
      />
      <div id="cosmos"></div>
    </div>
  );
}

export default Cosmos;
