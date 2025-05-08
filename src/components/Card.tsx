import React from 'react';
import type { CardData } from '../types'; // Adjust path if you created types.ts

interface CardProps {
  card: CardData;
  columnIndex: number;
  cardIndex: number;
}

const Card: React.FC<CardProps> = ({ card, columnIndex, cardIndex }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('cardId', card.id);
    e.dataTransfer.setData('sourceColumnIndex', columnIndex.toString());
    e.dataTransfer.setData('sourceCardIndex', cardIndex.toString());
    // Optional: add a class for visual feedback during drag
    e.currentTarget.classList.add('opacity-50', 'shadow-xl');
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // Optional: remove the visual feedback class
    e.currentTarget.classList.remove('opacity-50', 'shadow-xl');
  };

  return (
    <div
      id={card.id}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-white p-3 mb-3 rounded-md shadow-sm cursor-grab active:cursor-grabbing border border-gray-200 hover:shadow-md transition-shadow"
    >
      <h4 className="font-medium text-sm text-gray-800">{card.title}</h4>
      {card.description && (
        <p className="text-xs text-gray-600 mt-1">{card.description}</p>
      )}
    </div>
  );
};

export default Card;