import { useState } from "react";

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

  return (
    <div className="App">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onChangeItem={handleChangeItem}
      />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🧳Far Away😎</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) {
      alert("plz type desc");
      return;
    }
    const newItem = {
      description,
      quantity,
      packed: false,
      id: new Date(),
    };

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onChangeItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
            onDeleteItem={onDeleteItem}
            onChangeItem={onChangeItem}
          />
        ))}
      </ul>
    </div>
  );
}

function ListItem({ item, onDeleteItem, onChangeItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onChangeItem(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already pack X</em>
    </footer>
  );
}
