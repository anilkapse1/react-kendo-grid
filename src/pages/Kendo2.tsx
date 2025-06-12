import React, { useState } from "react";
import { Menu, type MenuSelectEvent } from "@progress/kendo-react-layout";
import Example1 from "../components/nagesh-kendo/Example1";
import Example2 from "../components/nagesh-kendo/Example2";
import Example3 from "../components/nagesh-kendo/Example3";
import Example4 from "../components/nagesh-kendo/Example4";
import Example5 from "../components/nagesh-kendo/Example5";
import Example6 from "../components/nagesh-kendo/Example6";
import Example7 from "../components/nagesh-kendo/example7";
import Example8 from "../components/nagesh-kendo/Example8";
import Example9 from "../components/nagesh-kendo/Example9";
import Example10 from "../components/nagesh-kendo/Example10";
import Example11 from "../components/nagesh-kendo/Example11";
import Example12 from "../components/nagesh-kendo/Example12";

const Kendo2 = () => {
  const [selected, setSelected] = useState<string | null>(null);

  const items = [
    {
      text: "Kendo Grid Examples",
      items: [
        { text: "1.Kendo Grid" },
        { text: "2.Sorting and Filtring" },
        { text: "3.Pagination" },
        { text: "4.Cell selection" },
        { text: "5.Row selection" },
        { text: "6.Custom cell" },
        { text: "7.Serverside Paging + Sorting" },
        { text: "8.Serverside Paging + Sorting+ Filtering" },
        { text: "9.Serverside Paging + Sorting+ Filtering + Export Excel" },
        { text: "10.Inline & popup edit/save and cancel" },
        { text: "11.Multi column Header" },
        { text: "12.Expand/colspan Multi column Header" },
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
      {selected === "1.Kendo Grid" && <Example1 />}
      {selected === "2.Sorting and Filtring" && <Example2 />}
      {selected === "3.Pagination" && <Example3 />}
      {selected === "4.Cell selection" && <Example4 />}
      {selected === "5.Row selection" && <Example5 />}
      {selected === "6.Custom cell" && <Example6 />}
      {selected === "7.Serverside Paging + Sorting" && <Example7 />}
      {selected === "8.Serverside Paging + Sorting+ Filtering" && <Example8 />}
      {selected === "9.Serverside Paging + Sorting+ Filtering + Export Excel" && (
        <Example9 />
      )}
      {selected === "10.Inline & popup edit/save and cancel" && <Example10 />}
      {selected === "11.Multi column Header" && <Example11 />}
      {selected === "12.Expand/colspan Multi column Header" && <Example12 />}
    </div>
  );
};

export default Kendo2;
