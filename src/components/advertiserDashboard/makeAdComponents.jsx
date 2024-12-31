import { useEffect, useState } from "react";

export const Field = ({ component, onChange, onDelete }) => {
  const handleChange = (e) => {
    onChange(component.id, e.target.name, e.target.value);
  };

  return (
    <div className="w-full flex justify-between gap-x-2 items-center py-2 px-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.04] hover:ring-1 hover:ring-black">
      <button
        onClick={() => onDelete(component.id)}
        className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 active:scale-95 transition-all duration-300"
      >
        ✖
      </button>
      <input
        className="w-1/3 px-3 py-1 text-sm border rounded-md focus:outline-blue-500 transition-all duration-300 ease-in-out"
        type="text"
        value={component.label}
        onChange={handleChange}
        name="label"
        placeholder="Label"
      />
      <input
        className="w-2/3 px-3 py-1 text-sm border rounded-md focus:outline-blue-500 transition-all duration-300 ease-in-out"
        type="text"
        value={component.value}
        onChange={handleChange}
        name="value"
        placeholder="Value"
      />
    </div>
  );
};

export const FieldMessage = ({ component, onChange, onDelete }) => {
  const handleChange = (e) => {
    onChange(component.id, e.target.name, e.target.value);
  };

  return (
    <div className="w-full flex items-center gap-x-2 py-2 px-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.04] hover:ring-1 hover:ring-black">
      <button
        onClick={() => onDelete(component.id)}
        className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 active:scale-95 transition-all duration-300"
      >
        ✖
      </button>
      <textarea
        onChange={handleChange}
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-blue-500 transition-all duration-300 ease-in-out"
        name="message"
        placeholder="Message"
        value={component.message}
      />
    </div>
  );
};

export const FieldList = ({ component, onChange, onDelete }) => {
  const [numberOfItems, setNumberOfItems] = useState(2);
  const [items, setItems] = useState(['', '']);
  const handleLabelChange = (e) => onChange(component.id, e.target.name, e.target.value);

  const handleListChange = (e, i) => {
    setItems(
      items.map((item, index) => (index === i ? e.target.value : item))
    );
  };

  useEffect(() => {
    onChange(component.id, 'items', items);
  }, [items]);

  const handleDeleteItem = (i) => {
    setItems(items.filter((_, index) => index !== i));
    setNumberOfItems(numberOfItems - 1);
  };

  const handleAdd = () => {
    setNumberOfItems(numberOfItems + 1);
    setItems([...items, '']);
  };

  return (
    <div className="w-full flex flex-col gap-2 py-4 pr-6 pl-4 bg-gray-50 rounded-md shadow-sm hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-[1.04] hover:ring-1 hover:ring-black">
      <div className="flex">
        <button
          className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 active:scale-95 transition-all duration-300"
          onClick={() => onDelete(component.id)}
        >
          ✖
        </button>
        <div className="flex w-full ml-2 justify-between items-center">
          <input
            className="w-2/5 px-3 py-1 text-sm border rounded-md focus:outline-blue-500 transition-all duration-300 ease-in-out"
            type="text"
            value={component.label}
            onChange={handleLabelChange}
            name="label"
            placeholder="Label"
          />
          <button
            className="md:px-3 px-1 py-1 bg-green-500 md:text-[14px] text-[10px] text-white rounded-full hover:bg-green-600 active:scale-95 transition-all duration-300"
            onClick={handleAdd}
          >
            ➕ Add Item
          </button>
        </div>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex items-center w-full gap-2 m-auto transition-all duration-300 ease-in-out transform">
          <div className='transition-all duration-300 ease-in-out transform w-full hover:scale-[1.01] hover:ring-1 hover:ring-black hover:rounded-md'>
            <input
              className="w-full px-3 py-1 text-sm border rounded-md focus:outline-blue-500 transition-all duration-300 ease-in-out"
              type="text"
              value={item}
              onChange={(e) => handleListChange(e, index)}
              name={`item-${index}`}
              placeholder={`List Item ${index + 1}`}
            />
          </div>
          {index > 1 && (
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-full hover:bg-red-600 active:scale-95 transition-all duration-300"
              onClick={() => handleDeleteItem(index)}
            >
              ✖
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

// BUTTONS

export const FieldButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 active:scale-95"
  >
    Add Label
  </button>
);

export const FieldListButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-teal-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-600 active:scale-95"
  >
    Add List of Items
  </button>
);

export const FieldMessageButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 active:scale-95"
  >
    Add Message
  </button>
);

export const ClearAllButton = ({ onClick, isDisabled }) => (
  <button
    onClick={onClick}
    className={`w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 active:scale-95 ${isDisabled ? 'disabled:bg-red-900 disabled:active:scale-100' : ''}`}
    disabled={isDisabled} // Disable button if isDisabled is true
  >
    Clear All
  </button>
);

export const UndoButton = ({ onClick, his }) => (
  <button
    onClick={onClick}
    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 active:scale-95 ${his ? 'disabled:bg-blue-900 disabled:active:scale-100' : 'bg-blue-500'}`}
    disabled={his}
  >
    <i className="fas fa-rotate-left"></i>
  </button>
);

export const RedoButton = ({ onClick, his }) => (
  <button
    onClick={onClick}
    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 active:scale-95 ${his ? 'disabled:bg-blue-900 disabled:active:scale-100' : 'bg-blue-500'}`}
    disabled={his}
  >
    <i className="fas fa-rotate-right"></i>
  </button>
);