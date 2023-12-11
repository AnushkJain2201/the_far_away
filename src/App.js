import { useState } from "react";

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

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems = {handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem} />
      <Stats items={items} />
    </div>
  );
}

export default App;

const Logo = () => {
  return <h1>🌴 The Far Away 🎒</h1>
}

const Form = ({handleAddItems}) => {
  // This state is for the input field and then pass that state in the value attribute of that input field
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  

  

  const handleSubmit = (e) => {
    // When we submit a form there will be a brief flash that happens due to the default behaviour of HTML, so to prevent this behaviour, we write the preventDefault method. But with this all the effects of HTML will be gone and we have to write the logic ourself.
    e.preventDefault();

    // If there is no description, we will not submit the form
    if(!description) return;

    // Creating an object for newly submitted value
    const newItem = {
      description, quantity, packed: false, id: Date.now()
    };

    handleAddItems(newItem);

    // After submiting the form successfully, we will insert the default value in the input fields.
    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>

      <h3>What do you need for your 😍 trip?</h3>

      {/* Here, also controlling element */}
      {/* The value of the e.target.value is always string, so in order to convert it into the number we used the Number function */}
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {/* Here we, are using an Array.from method to create an Array of 20 elements
        The first argument contains an object of length property, the second argument contain an function with first argument as element and second argument as index and we are only interested in index only here */}
        {Array.from({length: 20}, (_, i) => i + 1).map(
          (num) => (
            <option value={num} key={num}>
              {num}
            </option>
          )
        )}
      </select>
      {/* Here, we have to connect the state with the input field by handling the onChange event, and setting that state to the value of input field everytime it is changed */}
      <input type="text" placeholder="Item...." value={description} onChange={(e) => setDescription(e.target.value)}/>
      <button>Add</button>
    </form>
  );
}

const PackingList = ({items, handleDeleteItem, handleToggleItem}) => {
  // The states for the select tag
  const [sortBy, setSortBy] = useState('input');

  // This is a derived state that is based on the state items
  let sortedItems;

  // Here if the sortBy state is input we will simply set the sortedItems array will be equal to the original array
  if(sortBy === 'input') sortedItems = items;

  // Here we are using the slice() method first before using the sort method because the sort method is mutating method and React donot support mutating states
  // localeCompare method compare string lexiographically
  if(sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

  // By this the packed items will be shown in the last
  if(sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));


  return (
    <div  className="list">

      <ul>
        {/* Here we are using the map method on the sortedItems array, this array will be changed according to the sortby state */}
        {sortedItems.map(item => 
          (<Item item={item} key={item.id} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem} />
        ))}
      </ul>

      <div className="actions" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <select>
            <option value="input">Sort by input order</option>
            <option value="description">Sort by description</option>
            <option value="packed">Sort by packed status</option>
          </select>
      </div>
    </div>
  );
}

const Item = ({item, handleDeleteItem, handleToggleItem}) => {
  return (
    <li>
      <input type="checkbox" value={item.packed} onChange={() => {handleToggleItem(item.id)}} />
      <span style={item.packed ? {textDecoration: "line-through"} : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  );
  
}

const Stats = ({items}) => {
  // If items are emprty then we will return the below element
  if(!items.length) return <p className="stats"><em>Start Adding some items to your packing list 🚀</em></p>

  // These all are derived states
  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round((numPacked/numItems) * 100 );

  return (
    <footer className="stats">

      <em>
        {percentage === 100 ? 'You got everything! Ready to go ✈️' : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
        
      </em>
    </footer>
  );
}
