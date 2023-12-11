import { useState } from "react";

import Item from "./Item";

const PackingList = ({ items, handleDeleteItem, handleToggleItem, handleDeleteAll }) => {
    // The states for the select tag
    const [sortBy, setSortBy] = useState('input');

    // This is a derived state that is based on the state items
    let sortedItems;

    // Here if the sortBy state is input we will simply set the sortedItems array will be equal to the original array
    if (sortBy === 'input') sortedItems = items;

    // Here we are using the slice() method first before using the sort method because the sort method is mutating method and React donot support mutating states
    // localeCompare method compare string lexiographically
    if (sortBy === 'description') sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));

    // By this the packed items will be shown in the last
    if (sortBy === 'packed') sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));


    return (
        <div className="list">

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

                <button onClick={handleDeleteAll}>Clear List</button>
            </div>
        </div>
    );
}

export default PackingList;