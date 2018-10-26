import React from 'react';

const input = (props) =>{
  return (
    <div className="p-1">
        <div className="form-group">
          <input type="text" name={props.id} className="form-control" id={props.id}  onChange={props.InputHandler} onKeyPress={props.create}placeholder={props.placeholder}/>
          {props.error ? <span className="text-danger">The Name is required</span>:null}
        </div>
      </div>
  );
}

export default input;
