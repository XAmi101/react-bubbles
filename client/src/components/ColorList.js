import React, { useState } from "react";
import { axiosWithAuth } from '../axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  // const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };
 
  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
  .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res.data);
      const updatedColors = colors.map(color => {
        return (color.id === colorToEdit.id) ? colorToEdit: color;
      })
      updateColors(updatedColors);

    })
    .catch(error => console.log(error));
  };	  

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res => {
      console.log("deleted", res);
      updateColors(colors.filter(colorElement => colorElement.id !== color.id))
      // updateColors([...colors].filter(colorElement => colorElement !== color));

    })
  };

  // const addColor = event => {
  //   event.preventDefault();
  //   axiosWithAuth()
  //   .post('http://localhost:5000/api/colors', colorToAdd)
  //   .then(response => {
  //     console.log(response.data);
  //     updateColors([...colors, colorToAdd])
  //   })
  // }

  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}

       {/* <div className='newColorForm'>
        <form onSubmit={addColor}>
          
          <button type='submit' className='addBtn'>Add</button>
        </form>
      </div>
    </div> */}
    </div>
  );
};

export default ColorList;
