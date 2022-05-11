import React, { useState, useEffect } from 'react';

export default function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("api/books")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setBooks(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <div style={{ width: '600px', display: 'flex', flexWrap: 'wrap', margin: '0 auto' }}>
        {books.map(book => (
          <div key={book.id} style={{ height: '100px', width: '50%' }}>
            <div style={{ padding: '8px', height: '100%', display: 'flex', boxSizing: 'border-box' }}>
              <div style={{ width: '25%', display: 'flex', justifyContent: 'center' }}>
                <img src={book.cover} style={{ height: '100%', margin: '0 auto' }} />
              </div>
              <div style={{ width: '75%'}}>
                <span>{book.title}</span>
                <span>{book.issue_number}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
