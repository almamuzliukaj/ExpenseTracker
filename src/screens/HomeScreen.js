import React, { useState } from 'react';
import { 
  View, StyleSheet, SafeAreaView, StatusBar, 
  TouchableOpacity, Text, Platform 
} from 'react-native';
import ExpenseForm from '../components/expenses/ExpenseForm';
import ExpensesTable from '../components/expenses/ExpensesTable';
import { Colors } from '../constants/colors';

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const handleAddNew = () => {
    setSelectedExpense(null); // Reset for new entry
    setModalVisible(true);    // Open Modal
  };

  const handleEdit = (expense) => {
    setSelectedExpense(expense); // Load data to edit
    setModalVisible(true);       // Open Modal
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        
        {/* Main Content */}
        <View style={styles.content}>
          {/* 
             IMPORTANT: The <ExpenseForm /> is NO LONGER here. 
             We only show the table here.
          */}
          <ExpensesTable onEditExpense={handleEdit} />
        </View>

        {/* Floating Action Button (FAB) */}
        <TouchableOpacity 
          style={styles.fab} 
          onPress={handleAddNew}
          activeOpacity={0.8}
        >
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>

        {/* 
           The Form is now here, acting as a popup.
           It only shows when modalVisible is true.
        */}
        <ExpenseForm 
          visible={modalVisible} 
          onClose={() => setModalVisible(false)}
          expenseToEdit={selectedExpense}
        />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 100,
  },
  fabIcon: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '400',
    marginTop: -2, 
  }
});

export default HomeScreen;