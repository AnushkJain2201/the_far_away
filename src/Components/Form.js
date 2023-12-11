import { useState } from "react";

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

  export default Form;