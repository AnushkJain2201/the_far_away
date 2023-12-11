import { useState } from "react";

import Logo from "./Components/Logo";
import PackingList from "./Components/PackingList";
import Stats from "./Components/Stats";
import Form from "./Components/Form";

function App() {
  // This piece of state is an array that denote the arrays of packagingitems
  const [items, setItems] = useState([]);

  const handleAddItems = (item) => {
    // Here we are changing the state items according to the current state items, so we used the callback function
    // And, React is all about immutability, so we cannot mutate the current state item array so instead we pass a new array where the old array get spread using the spread operator and we add the new state.
    setItems((currItems) => [...currItems, item]);
  }

  const handleDeleteItem = (id) => {
    setItems((currItems) => currItems.filter(item => item.id !== id))
  }

  const handleToggleItem = (id) => {
    setItems((currItems) => currItems.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  const handleDeleteAll = () => {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems = {handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem} handleDeleteAll={handleDeleteAll}/>
      <Stats items={items} />
    </div>
  );
}

export default App;




