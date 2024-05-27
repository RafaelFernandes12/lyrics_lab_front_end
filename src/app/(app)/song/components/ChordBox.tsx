import { Draggable } from '@hello-pangea/dnd';

interface props {
  id: string,
  index: number
}

export default function ChordBox({id, index}: props) {
  return(
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="flex items-center w-min h-min bg-red-300"
        >
          Cm7
        </div>
      )}
    </Draggable>
  );
}