import { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((c) => [...c, item]);
  }

  function handleDeleteItem(id) {
    setItems((c) => c.filter((item) => item.id !== id));
  }

  function handleChangeItem(id) {
    setItems((c) =>
      items.map((item) => {
        if (item.id === id) return { ...item, packed: !item.packed };
        else return item;
      })
    );
  }

  function clearItems() {
    setItems([]);
  }

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onChangeItem={handleChangeItem}
        onClearItems={clearItems}
      />
      <Stats items={items} />
    </div>
  );
}
