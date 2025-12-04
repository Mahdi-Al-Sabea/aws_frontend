import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchItems, addItem, deleteItem } from './features/itemsSlice';

function App() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.items);
  const [newItemName, setNewItemName] = useState('');
  const [newItemDesc, setNewItemDesc] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItemName.trim()) {
      dispatch(addItem({ name: newItemName, description: newItemDesc }));
      setNewItemName('');
      setNewItemDesc('');
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans selection:bg-indigo-500 selection:text-white">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-4">
            Item Manager
          </h1>
          <p className="text-gray-400 text-lg">
            A simple full-stack application deployed on AWS.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Add Item Form */}
          <div className="bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
            <h2 className="text-2xl font-bold mb-6 text-indigo-300">Add New Item</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                  Item Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
                  placeholder="Enter item name"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500 h-32 resize-none"
                  placeholder="Enter description (optional)"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold rounded-xl shadow-lg transform transition hover:-translate-y-0.5 active:translate-y-0"
              >
                Add Item
              </button>
            </form>
          </div>

          {/* Items List */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-cyan-300 mb-4">Current Items</h2>

            {status === 'loading' && (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
              </div>
            )}

            {status === 'failed' && (
              <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-xl">
                Error: {error}
              </div>
            )}

            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 hover:border-gray-600 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-gray-500 hover:text-red-400 transition-colors p-2"
                      title="Delete Item"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {item.description || "No description provided."}
                  </p>
                  <div className="mt-4 text-xs text-gray-500 font-mono">
                    ID: {item._id}
                  </div>
                </div>
              ))}

              {items.length === 0 && status === 'succeeded' && (
                <div className="text-center py-12 text-gray-500 bg-gray-800/50 rounded-xl border border-dashed border-gray-700">
                  <p>No items found. Start by adding one!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
