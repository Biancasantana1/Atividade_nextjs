"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
//import React from 'react';
//import { useState } from 'react';
import React, { useState, useEffect } from 'react';

function SearchBar({filterText, onFilterTextChange}) {
  return (
    <form>
      <p>Procure uma mensagem:</p>
      <input type="text" value={filterText} placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

function ProductRow({ product }) {
  return (
    <tr>
      <td>{product[1]}</td>
      <td>{product[0]}</td>
      <td>{product[2]}</td>
    </tr>
  );
}


function ProductTable({ blogMessages, filterText}) {
  const rows = [];
  blogMessages.forEach((product) => {
    if (String (product[0]).toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    rows.push(
      <ProductRow
        product={product}
        key={product[1] + product[2]} />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function FilterableMessageTable({ messages }) {
  const [filterText, setFilterText] = useState('');
  return (
    <div>
      <SearchBar filterText={filterText}
      onFilterTextChange={setFilterText}/>
      <ProductTable blogMessages={messages} filterText={filterText}/>
    </div>
  ); 
}

/*export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);
  
  fetch('https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec')
    .then(response => response.json())
    .then(data => {
        setBlogMessages(data);
    });
    
    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages} />
      </main>
    )
}*/



export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec')
      .then(response => response.json())
      .then(data => {
          setBlogMessages(data);
      });
  }, []);

    return (
      <main className={styles.main}>
        <FilterableMessageTable messages={blogMessages} />
      </main>
    )
}
