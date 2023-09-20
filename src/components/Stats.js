export default function Stats({ items }) {
  const itemsCount = items.length;
  const packed =
    (items.filter((item) => item.packed).length / itemsCount) * 100;
  return (
    <footer className="stats">
      <em>
        You have {itemsCount} items on your list, and you already pack{" "}
        {packed.toFixed(2)} % of them
      </em>
    </footer>
  );
}
