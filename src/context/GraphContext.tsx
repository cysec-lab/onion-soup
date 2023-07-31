import { createContext, useState } from "react";
import { InputNode, InputLink } from "../types/graph";
import { Graph } from "@cosmograph/cosmos";

const GraphContext = createContext({
  graph: null as Graph<InputNode, InputLink> | null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setGraph: (_graph: Graph<InputNode, InputLink> | null) => {},
});

function GraphProvider(props: { children: React.ReactNode }) {
  const [graph, setGraph] = useState<Graph<InputNode, InputLink> | null>(null);

  return (
    <div>
      <GraphContext.Provider value={{ graph, setGraph }}>
        {props.children}
      </GraphContext.Provider>
    </div>
  );
}
export { GraphContext, GraphProvider };
