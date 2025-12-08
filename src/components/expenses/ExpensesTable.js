import React, { useState } from 'react';
import { View, FlatList, Text, TextInput, StyleSheet } from 'react-native';
import ExpenseItem from './ExpenseItem';
import { useExpenses } from '../../context/ExpenseContext';
import { Colors } from '../../constants/colors';
import CategoryFilter from '../ui/CategoryFilter';

const ExpensesTable = ({ onEditExpense }) => {
  const { expenses } = useExpenses();
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // SUGGESTION: Search State
  const [searchQuery, setSearchQuery] = useState('');

  // SUGGESTION: Dynamic Greeting Logic
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  // Filter Logic (Category + Search)
  const filteredExpenses = expenses.filter(e => {
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalAmount = filteredExpenses.reduce((sum, item) => sum + item.amount, 0);

  // SUGGESTION: Monthly Budget Logic (Example Budget: $2000)
  const monthlyBudget = 2000;
  // Calculate percentage, capped at 100% for the bar width
  const progress = Math.min((totalAmount / monthlyBudget) * 100, 100);
  const isOverBudget = totalAmount > monthlyBudget;

  return (
    <View style={styles.container}>
      
      {/* Header Section */}
      <View style={styles.headerContainer}>
        {/* Dynamic Greeting */}
        <Text style={styles.dateSubtitle}>{greeting.toUpperCase()}</Text>
        <Text style={styles.appTitle}>Expense Tracker</Text>
        
        {/* Search Bar */}
        <TextInput 
            style={styles.searchBar}
            placeholder="Search expenses (e.g. Uber, Coffee)..."
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
        />
      </View>

      <CategoryFilter 
        selectedCategory={selectedCategory} 
        onSelectCategory={setSelectedCategory} 
      />
      
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Recent Transactions</Text>
        <Text style={styles.listTotal}>
          Total: <Text style={{color: Colors.success}}>${totalAmount.toFixed(2)}</Text>
        </Text>
      </View>

      {/* Budget Progress Bar */}
      <View style={styles.budgetContainer}>
        <View style={styles.budgetInfo}>
            <Text style={styles.budgetLabel}>Monthly Budget</Text>
            <Text style={styles.budgetLabel}>${monthlyBudget}</Text>
        </View>
        <View style={styles.progressBarBackground}>
            <View style={[
                styles.progressBarFill, 
                { width: `${progress}%`, backgroundColor: isOverBudget ? Colors.error : Colors.success }
            ]} />
        </View>
      </View>

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ExpenseItem 
            {...item} 
            onEdit={() => onEditExpense(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          // Empty State with Emoji
          <View style={styles.emptyState}>
            <Text style={{fontSize: 40, marginBottom: 10}}>💸</Text>
            <Text style={styles.emptyText}>
                {searchQuery ? "No matching results." : "No expenses yet. Add one!"}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  appTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: '#000000',
    letterSpacing: -1,
    marginBottom: 16,
  },
  dateSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  searchBar: {
    backgroundColor: '#E5E5EA',
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
    marginTop: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
  },
  listTotal: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  // Budget Bar Styles
  budgetContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  budgetInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  budgetLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  // List Styles
  listContent: {
    paddingBottom: 100, 
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  }
});

export default ExpensesTable;