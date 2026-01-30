import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TbArrowBackUp } from "react-icons/tb";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import {getAllExpensesCategories, createExpenseCategory, updateExpenseCategory, deleteExpenseCategory} from "../api/expences"

function ExpenseCategories() {
  const userData = JSON.parse(localStorage.getItem("userData"));
  const loggedInEmail = userData?.email;
  
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  // Form states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryType, setNewCategoryType] = useState('Liability');
  
  // Edit states
  const [editingCategory, setEditingCategory] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryType, setEditCategoryType] = useState('Liability');
  
  // Delete states
  const [deletingCategoryId, setDeletingCategoryId] = useState(null);


  // Fetch existing categories
  const fetchCategories = async () => {
    try {
      const res = await getAllExpensesCategories()
      setCategories(res.data.data|| [])
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };


  useEffect(() => {
    fetchCategories();
  }, []);

  // Add Category Modal Functions
  const openAddModal = () => {
    setNewCategoryName('');
    setNewCategoryType('Liability');
    setShowAddModal(true);
  };

  const closeAddModal = () => {
    setShowAddModal(false);
  };

  // Edit Category Modal Functions
  const openEditModal = (category) => {
    setEditingCategory(category);
    setEditCategoryName(category.expense_category);
    setEditCategoryType(category.status);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingCategory(null);
    setEditCategoryName('');
    setEditCategoryType('Liability');
  };

  // Delete Category Modal Functions
  const openDeleteModal = (id) => {
    setDeletingCategoryId(id);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingCategoryId(null);
  };

  // Handle Add Category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert('Please enter category name');
      return;
    }
    
    try {
      const data = {
        expense_category: newCategoryName,
        status: newCategoryType,
        created_by: loggedInEmail || 'Admin'
      };
      
      await createExpenseCategory(data);
      fetchCategories(); // Refresh the list
      closeAddModal();
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  // Handle Edit Category
  const handleEditCategory = async () => {
    if (!editCategoryName.trim() || !editingCategory) return;
    
    try {
      const data = {
        expense_category: editCategoryName,
        status: editCategoryType,
        created_by: loggedInEmail || 'Admin'
      };
      
      await updateExpenseCategory(editingCategory.id, data);
      fetchCategories(); // Refresh the list
      closeEditModal();
    } catch (error) {
      console.error('Failed to update category:', error);
    }
  };

  // Handle Delete Category
  const handleDeleteCategory = async () => {
    if (!deletingCategoryId) return;
    
    try {
      await deleteExpenseCategory(deletingCategoryId);
      fetchCategories(); // Refresh the list
      closeDeleteModal();
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      {/* Add Category Modal */}
      {showAddModal && (
        
        <div className="fixed inset-0  bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Category</h3>
              <button
                onClick={closeAddModal}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Type
                </label>
                <select
                  value={newCategoryType}
                  onChange={(e) => setNewCategoryType(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Liability">Liability</option>
                  <option value="Assets">Assets</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeAddModal}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-indigo-800 text-white rounded hover:bg-indigo-900"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && editingCategory && (
        <div className="fixed inset-0  bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Edit Category</h3>
              <button
                onClick={closeEditModal}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={editCategoryName}
                  onChange={(e) => setEditCategoryName(e.target.value)}
                  placeholder="Enter category name"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  onKeyPress={(e) => e.key === 'Enter' && handleEditCategory()}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">
                  Category Type
                </label>
                <select
                  value={editCategoryType}
                  onChange={(e) => setEditCategoryType(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="Liability">Liability</option>
                  <option value="Assets">Assets</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeEditModal}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditCategory}
                className="px-4 py-2 bg-indigo-800 text-white rounded hover:bg-indigo-900"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0  bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-red-600">Delete Category</h3>
              <button
                onClick={closeDeleteModal}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                ✕
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to delete this category? This action cannot be undone.
              </p>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteCategory}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-800 text-white h-8 w-8 flex items-center justify-center rounded"
          >
            <TbArrowBackUp />
          </button>
          <h2 className="text-xl font-semibold">Expense Categories</h2>
        </div>
      </div>
    
      {/* Add Category Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={openAddModal}
          className="bg-indigo-800 text-white px-4 py-2 rounded-full text-sm hover:bg-indigo-900"
        >
          Add Category
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-end mb-4 gap-4">
        <div className="flex items-center gap-2 bg-slate-200 px-3 py-2 rounded-lg w-64">
          <BiSearchAlt2 />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-full"
          />
        </div>
      </div>

      {/* Categories List Table */}
      <div className="bg-white rounded-lg overflow-hidden">
        <table className="w-full text-sm border-separate">
          <thead>
            <tr>
              {["Sr no", "Expense Category", "Status", "Created by", "Action"].map((head) => (
                <th
                  key={head}
                  className="bg-[#56CCFF] px-4 py-3 text-left font-medium"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
        
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((item, index) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  {/* Sr no */}
                  <td className="px-4 py-3">
                    {index + 1}
                  </td>
                  
                  {/* Expense Category */}
                  <td className="px-4 py-3 font-medium">
                    {item.expense_category}
                  </td>
                  
                  {/* Status */}
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Liability' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  
                  {/* Created by */}
                  <td className="px-4 py-3">
                    {item.created_by}
                  </td>
                  
                  {/* Action */}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        className="bg-indigo-100 text-indigo-700 p-2 rounded-md hover:bg-indigo-200"
                        onClick={() => openEditModal(item)}
                      >
                        <FiEdit />
                      </button>

                      <button
                        className="bg-red-100 text-red-700 p-2 rounded-md hover:bg-red-200"
                        onClick={() => openDeleteModal(item.id)}
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ExpenseCategories;