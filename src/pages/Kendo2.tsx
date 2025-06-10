import React, { useState } from "react";
import { Menu, type MenuSelectEvent } from "@progress/kendo-react-layout";
import Example1 from "../components/nagesh-kendo/Example1";
import Example2 from "../components/nagesh-kendo/Example2";
import Example3 from "../components/nagesh-kendo/Example3";
import Example4 from "../components/nagesh-kendo/Example4";
import Example5 from "../components/nagesh-kendo/Example5";
import Example6 from "../components/nagesh-kendo/Example6";

const Kendo2 = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const items = [
    {
      text: "Kendo Grid Examples",
      items: [
        { text: "Kendo Grid" },
        { text: "Sorting and Filtring" },
        { text: "Pagination" },
        { text: "Cell selection" },
        { text: "Row selection" },
        { text: "Custom cell" },
      ],
    },
  ];

  const handleMenuSelect = (e: MenuSelectEvent) => {
    const text = e.item.text;
    setSelected(text ?? null);
  };

  return (
    <div style={{ padding: 20 }}>
      <Menu items={items} onSelect={handleMenuSelect} />
      {selected === "Kendo Grid" && <Example1 />}
      {selected === "Sorting and Filtring" && <Example2 />}
      {selected === "Pagination" && <Example3 />}
       {selected === "Cell selection" && <Example4 />}
       {selected === "Row selection" && <Example5 />}
       {selected === "Custom cell" && <Example6 />}
    </div>
  );
};

export default Kendo2;
