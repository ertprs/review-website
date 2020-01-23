import React, { Component } from "react";
import dynamic from "next/dynamic";
import _get from "lodash/get";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const DragDropContext = dynamic(
  () =>
    import("react-beautiful-dnd").then(reactDnd => reactDnd.DragDropContext),
  {
    ssr: false
  }
);
const Droppable = dynamic(
  () => import("react-beautiful-dnd").then(reactDnd => reactDnd.Droppable),
  {
    ssr: false
  }
);
const Draggable = dynamic(
  () => import("react-beautiful-dnd").then(reactDnd => reactDnd.Draggable),
  {
    ssr: false
  }
);

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  // const result = Array.from(list);
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 7;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "#fff",
  boxShadow: "0px 2px 4px #d8d8d8",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: "100%"
});

class WidgetPlatformPreference extends Component {
  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    // dropped outside the list
    const preferencePlatformArray = _get(
      this.props,
      "preferencePlatformArray",
      []
    );
    if (!result.destination) {
      return;
    }

    const items = reorder(
      preferencePlatformArray,
      result.source.index,
      result.destination.index
    );

    this.props.setPreferencePlatformData(items);
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    const preferencePlatformArray = _get(
      this.props,
      "preferencePlatformArray",
      []
    );
    return (
      <>
        <h6>Select platform ordering :</h6>
        <div style={{ marginBottom: "8px" }}>
          <small>
            You may re-order the boxes below by dragging and dropping, to set
            your preferred platform order
          </small>
        </div>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {preferencePlatformArray.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <div style={{ textAlign: "justify" }}>
                          {index + 1}-) {_get(item, "label", "")} Reviews
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          {this.props.refreshWidget ? (
            <Button size="small" disabled={true}>
              <CircularProgress size={18} />
            </Button>
          ) : (
            <Button
              size="small"
              onClick={this.props.refreshWidgetOnDemand}
              disabled={this.props.refreshWidget}
            >
              Click here after ordering to see live preview
            </Button>
          )}
        </div>
      </>
    );
  }
}

export default WidgetPlatformPreference;
