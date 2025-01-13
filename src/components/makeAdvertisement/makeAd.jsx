import React, {useState } from 'react';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import Card from '../card';
import ErrorMessage from '../error';  // Make sure this is correctly imported
import { Field, FieldList, FieldMessage } from './makeAdComponents';
import { FieldButton, FieldListButton, FieldMessageButton, ClearAllButton, UndoButton, RedoButton, PreviewButton } from './makeAdComponents';


let nextId = 1;

const MakeAd = ({advertisement,setAdvertisement}) => {

  const [history, setHistory] = useLocalStorage('history', []);
  const [undohistory, setundoHistory] = useLocalStorage('undohistory', []);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = (type) => {
    const id = nextId++;
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
      default:
        break;
    }

    setAdvertisement({...advertisement,sequence:[...advertisement.sequence, newComponent]});
    setHistory([
      ...history,
      { action: 'add', component: newComponent, index: advertisement.sequence.length }, // Track index
    ]);
  };

  const handleChange = (id, name, value) => {
    setAdvertisement((ad) =>{
      let prevSequence = ad.sequence
      let updatedSequence = prevSequence.map((component) =>
        component.id === id ? { ...component, [name]: value } : component
      )
      return {...advertisement,sequence:updatedSequence}
    });
    setHistory((prevHistory) =>
      prevHistory.map((entry) => {
        if (entry.component && entry.component.id === id) {
          return { ...entry, component: { ...entry.component, [name]: value } };
        }
        return entry;
      })
    );
  };

  const handleDelete = (id) => {
    const deleted = advertisement.sequence.find((component) => component.id === id);
    setHistory([...history, { action: 'delete', component: deleted, index: advertisement.sequence.indexOf(deleted) }]);
    setAdvertisement({...advertisement,sequence:advertisement.sequence.filter((component) => component.id !== id)});
  };

  const handleClearAll = () => {
    setHistory([...history, { action: 'clear', components: [...advertisement.sequence] }]);
    setAdvertisement({...advertisement,sequence:[]});
    setundoHistory([]);
  };

  const handleUndo = () => {
    if (history.length === 0) return;

    const newHistory = [...history];
    const lastAction = newHistory.pop();

    if (lastAction) {
      setundoHistory((prevUndoHistory) => [...prevUndoHistory, lastAction]);

      switch (lastAction.action) {
        case 'add':
          setAdvertisement({...advertisement,sequence:advertisement.sequence.filter((component) => component.id !== lastAction.component.id)});
          break;
        case 'delete':
          const restored = [...advertisement.sequence];
          restored.splice(lastAction.index, 0, lastAction.component);
          setAdvertisement({...advertisement,sequence:restored});
          break;
        case 'clear':
          setAdvertisement({...advertisement,sequence:lastAction.components});
          break;
        default:
          break;
      }

      setHistory(newHistory); // Update history after undo operation
    }
  };

  const handleRedo = () => {
    if (undohistory.length === 0) return;

    const newUndoHistory = [...undohistory];
    const prevAction = newUndoHistory.pop();

    if (prevAction) {
      setHistory((prevHistory) => [...prevHistory, prevAction]);

      switch (prevAction.action) {
        case 'add':
          setAdvertisement({...advertisement,sequence:[...advertisement.sequence, prevAction.component]});
          break;
        case 'delete':
          const removed = [...advertisement.sequence];
          removed.splice(prevAction.index, 1);
          setAdvertisement({...advertisement,sequence:removed});
          break;
        case 'clear':
          setAdvertisement({...advertisement,sequence:[]});
          break;
        default:
          break;
      }
    }

    setundoHistory(newUndoHistory);
  };

  const handlePreview = () => {
    // Clear any previous error
    setError(null);

    // Check validation
    if (!advertisement.title) {
      setError({ title: 'Error', message: 'Please enter a title before previewing.' });
      return;
    } else if (!advertisement.deadline) {
      setError({ title: 'Error', message: 'Please select a deadline before previewing.' });
      return;
    } else if (advertisement.sequence.length < 3) {
      setError({ title: 'Error', message: 'Please add at least 3 items to preview.' });
      return;
    }


    setShowPreview(true);
  };

  const handleDeadlineChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toString();
    setAdvertisement({...advertisement,deadline:formattedDate});
  };

  const handleClosePreview = () => {
    setShowPreview(false);
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 15) {
      setAdvertisement({...advertisement,title:newTitle})
    }
  };

  return (
    <div className="mt-20 p-6 bg-gray-100 min-h-[600px] flex flex-col gap-6 dark:bg-gray-900">
      <h1 className="text-3xl font-bold dark:text-white transition-all duration-300 ease-in-out">Step 1 - Create Your Advertisement</h1>
      <div className="flex flex-col md:flex-row gap-6 h-full">
        <div className="w-full min-h-[500px] overflow-y-visible bg-white shadow-lg rounded-md p-6 flex flex-col gap-4 transition-all duration-300 ease-in-out">
          <div className="flex items-center gap-2">
            <input
              className="w-full px-4 py-2 text-xl font-semibold border-b mb-4 focus:outline-none transition-all duration-300"
              placeholder="Enter Advertisement Title"
              value={advertisement.title}
              onChange={handleTitleChange}
            />
            <span className="text-gray-500">{advertisement.title.length}/15</span>
          </div>
          <div className="flex flex-col gap-4">
            {advertisement.sequence.map((component) => {
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
              onChange={handleDeadlineChange}
              placeholder="Select Deadline"
            />
            {advertisement.deadline && <div className="text-gray-700 mt-2">{advertisement.deadline}</div>}
          </div>
        </div>
        <div className="md:w-1/3 w-full flex flex-col gap-4">
          <FieldButton onClick={() => handleClick('field')} />
          <FieldListButton onClick={() => handleClick('fieldList')} />
          <FieldMessageButton onClick={() => handleClick('fieldMessage')} />
          <ClearAllButton onClick={handleClearAll} disabled={advertisement.sequence.length === 0} />
          <div className="flex gap-2">
            <UndoButton onClick={handleUndo} disabled={history.length === 0} />
            <RedoButton onClick={handleRedo} disabled={undohistory.length === 0} />
          </div>
          <PreviewButton onClick={handlePreview} disabled={advertisement.sequence.length === 0 || advertisement.title.length === 0 || !advertisement.deadline} />
        </div>
      </div>

      {/* Conditionally render the error message */}
      {error && (
        <ErrorMessage title={error.title} message={error.message} state="true" />
      )}

      {showPreview && (
        <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <div className="relative w-96 text-right">
            <button
              className="transform text-white hover:text-red-600 pr-1 focus:outline-none text-right hover:scale-[1.35] active:text-red-800 active:scale-95 transition 500ms all-out"
              onClick={handleClosePreview}
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>
          <Card advertisement={advertisement} />
        </div>
      )}
    </div>
  );
};

export default MakeAd;
