import React, { useState } from "react";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import Example1 from "../components/anil-kendo/Example1";
import Example2 from "../components/anil-kendo/Example2";
import Example3 from "../components/anil-kendo/Example3";
import Example4 from "../components/anil-kendo/Example4";
import Example5 from "../components/anil-kendo/Example5";
import Example6 from "../components/anil-kendo/Example6";
import Example7 from "../components/anil-kendo/Example7";
import Example8 from "../components/anil-kendo/Example8";
import Example9 from "../components/anil-kendo/Example9";

const Kendo1 = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ padding: 20 }}>
      <TabStrip selected={selected} onSelect={(e) => setSelected(e.selected)}>
        <TabStripTab title="Example1">
          <Example1 />
        </TabStripTab>
        <TabStripTab title="Example2">
          <Example2 />
        </TabStripTab>
        <TabStripTab title="Example3">
          <Example3 />
        </TabStripTab>
        <TabStripTab title="Example4">
          <Example4 />
        </TabStripTab>
        <TabStripTab title="Example5">
          <Example5 />
        </TabStripTab>
        <TabStripTab title="Example6">
          <Example6 />
        </TabStripTab>
        <TabStripTab title="Example7">
          <Example7 />
        </TabStripTab>
        <TabStripTab title="Example8">
          <Example8 />
        </TabStripTab>
        <TabStripTab title="Example9">
          <Example9 />
        </TabStripTab>
      </TabStrip>
    </div>
  );
};

export default Kendo1;
