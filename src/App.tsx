import { useState } from "react";
import Column from "./components/Column";
import type { ColumnData, CardData } from "./types";
import { initialColumns } from "./initialData";

function App() {
  const [columns, setColumns] = useState<ColumnData[]>(() => {
    return initialColumns;
  });

  const [draggingOverCardIndex, setDraggingOverCardIndex] = useState<
    number | null
  >(null);
  const [draggingOverColumnIndex, setDraggingOverColumnIndex] = useState<
    number | null
  >(null);

  const handleDropCard = (
    targetColumnIndex: number,
    targetCardIndex: number | null,
    cardId: string,
    sourceColumnIndex: number,
    sourceCardIndex: number
  ) => {
    if (cardId === null) return;

    const newColumns = [...columns];
    const sourceCol = newColumns[sourceColumnIndex];
    const targetCol = newColumns[targetColumnIndex];

    // Find and remove the card from the source column
    const cardToMove = sourceCol.cards.find((c) => c.id === cardId);
    if (!cardToMove) return;

    sourceCol.cards = sourceCol.cards.filter((c) => c.id !== cardId);

    // Add the card to the target column at the specified index
    // If targetCardIndex is null, or if it's for a different column, add to the end
    // or at the determined position based on dragOver.
    let actualTargetIndex = targetCardIndex;

    if (actualTargetIndex === null || sourceColumnIndex !== targetColumnIndex) {
      // If dropping onto a column (not a specific card), or different column
      // and targetCardIndex wasn't set by dragging over a card,
      // place it based on where the drop happened in the column.
      // For simplicity here, if targetCardIndex is null, add to end.
      // A more precise implementation might use mouse coordinates relative to cards.
      actualTargetIndex = targetCol.cards.length;
    } else if (sourceColumnIndex === targetColumnIndex) {
      // Reordering within the same column
      // Adjust index if moving card downwards in the same column
      if (sourceCardIndex < actualTargetIndex) {
        // No adjustment needed if already handled by targetCardIndex being the one below
      }
    }

    // Ensure actualTargetIndex is valid
    if (actualTargetIndex > targetCol.cards.length) {
      actualTargetIndex = targetCol.cards.length;
    }

    targetCol.cards.splice(actualTargetIndex, 0, cardToMove);

    setColumns(newColumns);
    setDraggingOverCardIndex(null);
    setDraggingOverColumnIndex(null);
  };

  const handleDragOverCard = (
    targetColumnIndex: number,
    targetCardIndex: number
  ) => {
    setDraggingOverColumnIndex(targetColumnIndex);
    setDraggingOverCardIndex(targetCardIndex);
  };

  // Function to add a new card (Example)
  const addNewCard = (
    columnIndex: number,
    title: string,
    description: string
  ) => {
    const newCard: CardData = {
      id: `task-${Date.now()}`, // Simple unique ID
      title,
      description,
    };
    const newColumns = [...columns];
    newColumns[columnIndex].cards.push(newCard);
    setColumns(newColumns);
  };

  return (
    <div className="min-h-full p-4 sm:p-8 flex flex-col items-center">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white shadow-sm">
          Kanban Board
        </h1>
        <p className="text-gray-200">
          Drag and drop tasks to organize your workflow
        </p>
      </header>

      {/* Example: Add new card button for the first column */}
      <div className="mb-6">
        <button
          onClick={() => {
            const title = prompt("Enter new card title for 'To Do':");
            const description = prompt("Enter description for 'To Do:");
            if (title && description) addNewCard(0, title, description);
          }}
          className="bg-white text-gray-600 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          Add Card to "To Do"
        </button>
      </div>

      <main className="flex flex-wrap justify-center gap-6 w-full max-w-6xl">
        {columns.map((column, index) => (
          <Column
            key={column.id}
            column={column}
            columnIndex={index}
            onDropCard={handleDropCard}
            onDragOverCard={handleDragOverCard}
            draggingOverCardIndex={draggingOverCardIndex}
            draggingOverColumnIndex={draggingOverColumnIndex}
          />
        ))}
      </main>
      <footer className="absolute bottom-0 text-gray-100">
        <a href="/">Copyright</a>
      </footer>
    </div>
  );
}

export default App;
