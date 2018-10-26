import React from 'react';

const item = (props) =>{
  let itemClassNames = ['item','p-2','m-2','d-flex','justify-content-between'];
  if(props.isDone){
    itemClassNames.push('itemDone');
  }
  return (
    <div className={itemClassNames.join(" ")} draggable="true" onDragStart={props.dragStart} onDragEnd={props.dragEnd}>
      {props.name}
      <button className="iconBtn" onClick={props.itemDone}><i className="fas fa-fighter-jet"></i></button>
    </div>
  );
};

export default item;