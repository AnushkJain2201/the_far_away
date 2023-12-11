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

  export default Stats;