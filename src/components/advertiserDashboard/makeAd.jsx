import React, { useEffect, useState } from 'react';

const Field = ({ component, onChange, onDelete }) => {
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

const FieldMessage = ({ component, onChange, onDelete }) => {
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

const FieldList = ({ component, onChange, onDelete }) => {
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

const MakeAd = () => {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [sequence, setSequence] = useState([]);
  const [history, setHistory] = useState([]);
  const [undohistory, setundoHistory] = useState([]);

  const handleClick = (type) => {
    const id = Date.now();
    let newComponent = { id, type };

    switch (type) {
      case 'field':
        newComponent = { ...newComponent, label: '', value: '' };
        break;
      case 'fieldList':
        newComponent = { ...newComponent, label: '', items: [] };
        break;
      case 'fieldMessage':
        newComponent = { ...newComponent, message: '' };
        break;
    }

    setSequence([...sequence, newComponent]);
    setHistory([...history, { action: 'add', component: newComponent }]);
  };

  const handleChange = (id, name, value) => {
    setSequence(
      sequence.map((component) =>
        component.id === id ? { ...component, [name]: value } : component
      )
    );
  };

  const handleDelete = (id) => {
    const deleted = sequence.find((component) => component.id === id);
    setHistory([...history, { action: 'delete', component: deleted }]);
    setSequence(sequence.filter((component) => component.id !== id));
  };

  const handleClearAll = () => {
    setHistory([...history, { action: 'clear', components: [...sequence] }]);
    setSequence([]);
  };

  const handleUndo = () => {
    const lastAction = history.pop();
    setundoHistory([...undohistory, lastAction]);
    if (lastAction) {
      if (lastAction.action === 'add') {
        setSequence(sequence.filter((component) => component.id !== lastAction.component.id));
      } else if (lastAction.action === 'delete') {
        setSequence([...sequence, lastAction.component]);
      } else if (lastAction.action === 'clear') {
        setSequence(lastAction.components);
      }
      setHistory([...history]);
    }
  };

  const handleRedo = () => {
    const prevAction = undohistory.pop()
    switch (prevAction.action) {
      case 'add':
        setSequence([...sequence, prevAction.component])
        break;
      case 'delete':
        setSequence(sequence.filter((component) => component.id !== prevAction.component.id));
        break;
      case 'clear':
        setSequence([]);
        break;
    }
    setHistory([...history, prevAction])
  }

  const isUndoDisabled = history.length === 0;
  const isRedoDisabled = undohistory.length === 0;
  const isClearAllDisabled = sequence.length === 0;

  return (
    <div className="mt-10 p-6 bg-gray-100 h-[600px] max-h-[600px] flex flex-col gap-6 dark:bg-gray-900">
      <h1 className="text-3xl font-bold dark:text-white transition-all duration-300 ease-in-out">Create Your Advertisement</h1>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full max-h-[500px] overflow-y-auto bg-white shadow-lg rounded-md p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out">
          <input
            className="w-full px-4 py-2 text-xl font-semibold border-b mb-4 focus:outline-none transition-all duration-300"
            placeholder="Enter Advertisement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex flex-col gap-4">
            {sequence.map((component) => {
              switch (component.type) {
                case 'field':
                  return (
                    <Field
                      key={component.id}
                      component={component}
                      onChange={handleChange}
                      onDelete={handleDelete}
                    />
                  );
                case 'fieldList':
                  return (
                    <FieldList
                      key={component.id}
                      component={component}
                      onChange={handleChange}
                      onDelete={handleDelete}
                    />
                  );
                case 'fieldMessage':
                  return (
                    <FieldMessage
                      key={component.id}
                      component={component}
                      onChange={handleChange}
                      onDelete={handleDelete}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
          <div className="flex justify-between items-center mt-auto">
            <label className="font-semibold text-gray-700">Deadline:</label>
            <input
              className="px-2 py-2 text-sm md:text-md font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300 bg-gradient-to-r from-gray-100 to-gray-300 text-gray-800 hover:scale-105 focus:ring-offset-2 transform ease-in-out"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="Select Deadline"
            />
          </div>
        </div>
        <div className="md:w-1/3 w-full flex flex-col gap-4">
          <FieldButton onClick={() => handleClick('field')} />
          <FieldListButton onClick={() => handleClick('fieldList')} />
          <FieldMessageButton onClick={() => handleClick('fieldMessage')} />
          <ClearAllButton onClick={handleClearAll} isDisabled={isClearAllDisabled} />
          <div className="flex gap-5">
            <UndoButton onClick={handleUndo} his={isUndoDisabled} />
            <RedoButton onClick={handleRedo} his={isRedoDisabled} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MakeAd;

const FieldButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-green-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-green-600 active:scale-95"
  >
    Add Label
  </button>
);

const FieldListButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-teal-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-teal-600 active:scale-95"
  >
    Add List of Items
  </button>
);

const FieldMessageButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-yellow-600 active:scale-95"
  >
    Add Message
  </button>
);

const ClearAllButton = ({ onClick, isDisabled }) => (
  <button
    onClick={onClick}
    className={`w-full bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 active:scale-95 ${isDisabled ? 'disabled:bg-red-900 disabled:active:scale-100' : ''}`}
    disabled={isDisabled} // Disable button if isDisabled is true
  >
    Clear All
  </button>
);

const UndoButton = ({ onClick, his }) => (
  <button
    onClick={onClick}
    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 active:scale-95 ${his ? 'disabled:bg-blue-900 disabled:active:scale-100' : 'bg-blue-500'}`}
    disabled={his} // Correctly apply the disabled state
  >
    <i className="fas fa-rotate-left"></i>
  </button>
);

const RedoButton = ({ onClick, his }) => (
  <button
    onClick={onClick}
    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 active:scale-95 ${his ? 'disabled:bg-blue-900 disabled:active:scale-100' : 'bg-blue-500'}`}
    disabled={his} // Correctly apply the disabled state
  >
    <i className="fas fa-rotate-right"></i>
  </button>
);

