import React from 'react';
import Card from './Card';
import type { ColumnData, CardData as ICardData } from '../types'; 

interface ColumnProps {
  column: ColumnData;
  columnIndex: number;
  onDropCard: (
    targetColumnIndex: number,
    targetCardIndex: number | null, // null means drop at the end
    cardId: string,
    sourceColumnIndex: number,
    sourceCardIndex: number
  ) => void;
  onDragOverCard: (
    targetColumnIndex: number,
    targetCardIndex: number
  ) => void; // For reordering visual cue
  draggingOverCardIndex: number | null;
  draggingOverColumnIndex: number | null;
}

const Column: React.FC<ColumnProps> = ({
  column,
  columnIndex,
  onDropCard,
  onDragOverCard,
  draggingOverCardIndex,
  draggingOverColumnIndex,
}) => {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary to allow dropping
    // If not dragging over a specific card, means dragging over the column itself (empty space)
    if (draggingOverCardIndex === null && e.target === e.currentTarget) {
       // You could highlight the column here if desired
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const sourceColumnIndex = parseInt(e.dataTransfer.getData('sourceColumnIndex'), 10);
    const sourceCardIndex = parseInt(e.dataTransfer.getData('sourceCardIndex'), 10);

    // If draggingOverCardIndex is not null, we are dropping onto another card (for reordering)
    // Otherwise, we are dropping into the column (potentially empty or at the end)
    const targetCardIndex = draggingOverCardIndex !== null && draggingOverColumnIndex === columnIndex
      ? draggingOverCardIndex
      : column.cards.length; // Default to end of the list if not over a specific card or if column is different

    if (cardId && !isNaN(sourceColumnIndex) && !isNaN(sourceCardIndex)) {
      onDropCard(columnIndex, targetCardIndex, cardId, sourceColumnIndex, sourceCardIndex);
    }
  };

 const handleCardDragOver = (e: React.DragEvent<HTMLDivElement>, targetCardIndex: number) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent column's dragOver from firing
    onDragOverCard(columnIndex, targetCardIndex);
  };


  return (
    <div
      className="bg-gray-100 p-4 rounded-lg shadow-md w-72 min-h-[200px] flex flex-col"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h3 className="font-semibold text-lg text-gray-700 mb-4 border-b pb-2">
        {column.title}
      </h3>
      <div className="flex-grow space-y-1"> {/* Ensure cards take available space */}
        {column.cards.map((card, cardIndex) => (
          <div
            key={card.id}
            onDragOver={(e) => handleCardDragOver(e, cardIndex)}
            className={`
              relative
              ${draggingOverColumnIndex === columnIndex && draggingOverCardIndex === cardIndex ? 'pt-10' : ''}
            `} // Add padding to create space for dropping above
          >
            {draggingOverColumnIndex === columnIndex && draggingOverCardIndex === cardIndex && (
              <div className="absolute top-0 left-0 right-0 h-2 bg-blue-300 rounded -mt-1 z-10 transition-all"></div>
            )}
            <Card
              card={card}
              columnIndex={columnIndex}
              cardIndex={cardIndex}
            />
          </div>
        ))}
        {/* Placeholder for dropping at the end of an empty or non-empty column */}
         {column.cards.length === 0 && draggingOverColumnIndex === columnIndex && draggingOverCardIndex === null && (
           <div className="h-10 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-sm text-gray-400">
             Drop here
           </div>
         )}
      </div>
    </div>
  );
};

export default Column;