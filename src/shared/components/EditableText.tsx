import { useState } from "react";

interface IProps{
    initialText: string;  // Initial text to display
    onConfirm: (message: string) => void;
}

function EditableText({initialText,onConfirm}:IProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(initialText);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (event:any) => {
    setText(event.target.value);
  };

  const handleBlur = () => {
    //Update name
    onConfirm(text);
    setIsEditing(false);
  };

  return (
    <div>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur} // Exit editing mode on losing focus
          autoFocus
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{text}</span>
      )}
    </div>
  );
};

export default EditableText;