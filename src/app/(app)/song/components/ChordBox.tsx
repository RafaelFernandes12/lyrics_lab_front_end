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
          className="flex items-center min-w-6 h-min bg-red-300 text-xs"
        >
          {index}
        </div>
      )}
    </Draggable>
  );
}