import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd'
import './TodoCreating.css';

export default function Card ({ id, text, index, moveCard }) {
  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: 'todo',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }

      const dragIndex = item.index
      const hoverIndex = index

      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect()

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      const clientOffset = monitor.getClientOffset()

      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    item: { type: 'todo', id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  drag(drop(ref));

  const opacity = isDragging ? 0 : 1;
  return (
    <li ref={ref} className='todo__item' style= {{ opacity }}>
      <p className='todo__item-id'>{id}</p>
      <p className='todo__item-text'>{text}</p>
    </li>
  )
}
