import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { useState } from 'react';
import ChordBox from './ChordBox';

export default function ChordLine() {
  const [chords, setChords] = useState([1, 2, 3, 4, 5, 6, 7]);

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  }

  function onDragEnd(result: any) {
    if(!result.destination) return;
    const items = reorder(chords, result.source.index, result.destination.index);
    setChords(items);
  }

  return(
    <div >
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chordBoxes" direction="horizontal">
          {(provided) => (
            <div
              className="flex gap-1  p-1 w-2/5 bg-slate-300"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {chords.map((i, index) => (
                <ChordBox key={i} id={i.toString()} index={index}/>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}