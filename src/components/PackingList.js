import { useState } from "react";
import ListItem from "./ListItem";

export default function PackingList({
  items,
  onDeleteItem,
  onChangeItem,
  onClearItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  } else if (setSortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  } else {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  function changeSortBy(e) {
    setSortBy(e.target.value);
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onChangeItem={onChangeItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => changeSortBy(e)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
}
