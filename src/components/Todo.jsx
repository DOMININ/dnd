import React, { useState, useEffect, useCallback } from 'react';
import update from 'immutability-helper'
import './Todo.css';

import TodoCreating from './TodoCreating';

export default function Todo() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const url = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);

      const res = await fetch(url);
      res
        .json()
        .then(res => {
          setData(res);
          setIsLoading(false);
        });
    }

    fetchData();
  }, []);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = data[dragIndex];
      setData(
        update(data, {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
        }),
      )
    },
    [data],
  )

  return (
    <ul className='todo__list'>
      {isLoading ? 'Loading' : (
        data.map((data, index) =>
          <TodoCreating
            key={data.id}
            id={data.id}
            text={data.title}
            moveCard={moveCard}
            index={index}
          />
        )
      )}
    </ul>
  );
}
