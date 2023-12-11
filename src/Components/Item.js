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

  export default Item;