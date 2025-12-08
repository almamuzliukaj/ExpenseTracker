import React, { createContext, useState, useContext } from 'react';

const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // Dummy initial data for testing
  const [expenses, setExpenses] = useState([
    { id: '1', title: 'Groceries', amount: 45.50, category: 'Food', date: new Date().toISOString() },
    { id: '2', title: 'Uber', amount: 12.00, category: 'Transport', date: new Date(Date.now() - 86400000).toISOString() },
    { id: '3', title: 'Netflix', amount: 15.99, category: 'Entertainment', date: new Date(Date.now() - 172800000).toISOString() },
  ]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [
      { ...expense, id: Math.random().toString(), date: new Date().toISOString() },
      ...prevExpenses,
    ]);
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter(expense => expense.id !== id));
  };

  const updateExpense = (id, updatedData) => {
    setExpenses(prevExpenses => 
      prevExpenses.map(exp => exp.id === id ? { ...exp, ...updatedData } : exp)
    );
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, updateExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => useContext(ExpenseContext);