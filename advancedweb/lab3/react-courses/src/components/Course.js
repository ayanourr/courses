// Course.js
import React from 'react';

function Course({ name, confirmation, onConfirm, onEdit, onDelete }) {
  return (
    <div className="course">
      <h3>{name}</h3>
      {confirmation === 0 ? (
        <div className="actions">
          <button onClick={onEdit}>Edit</button>
          <button onClick={onConfirm}>Confirm</button>
          <button onClick={onDelete}>Delete</button>
        </div>
      ) : ""}
    </div>
  );
}

export default Course;
