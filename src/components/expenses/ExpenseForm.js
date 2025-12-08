import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  ScrollView, Keyboard, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useExpenses } from '../../context/ExpenseContext';

const CATEGORIES = ['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Other'];

const ExpenseForm = ({ visible, onClose, expenseToEdit }) => {
  const { addExpense, updateExpense } = useExpenses();
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');

  // Populate form when opening for edit
  useEffect(() => {
    if (visible) {
      if (expenseToEdit) {
        setTitle(expenseToEdit.title);
        setAmount(expenseToEdit.amount.toString());
        setCategory(expenseToEdit.category);
      } else {
        // Reset for new expense
        setTitle('');
        setAmount('');
        setCategory('Food');
      }
    }
  }, [visible, expenseToEdit]);

  const handleSubmit = () => {
    if (!title || !amount) return;

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
    };

    if (expenseToEdit) {
      updateExpense(expenseToEdit.id, expenseData);
    } else {
      addExpense(expenseData);
    }

    // Close and cleanup
    Keyboard.dismiss();
    onClose();
  };

  const handleCategoryPress = (cat) => {
    setCategory(cat);
    // Keyboard remains open to allow continuous typing
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.modalOverlay}
        // Offset ensures the modal moves up correctly when keyboard opens
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Changed back to View (removed ScrollView) for the main container */}
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <Text style={styles.header}>
              {expenseToEdit ? 'Edit Expense' : 'Add New Expense'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Title Input */}
          <TextInput
            style={styles.input}
            placeholder="What was it?"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={Colors.textSecondary}
            autoFocus={!expenseToEdit}
            returnKeyType="next"
          />

          {/* Amount Input */}
          <View style={styles.amountContainer}>
            <Text style={styles.currencyPrefix}>$</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholderTextColor={Colors.textSecondary}
              returnKeyType="done"
            />
          </View>

          {/* Category Picker */}
          <Text style={styles.label}>Category</Text>
          <View style={styles.scrollWrapper}> 
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              // Inner padding ensures the first/last items aren't cut off
              contentContainerStyle={styles.scrollContent} 
              style={styles.categoryContainer}
              // This property is key: it allows you to tap categories without closing the keyboard
              keyboardShouldPersistTaps="always" 
            >
              {CATEGORIES.map((cat) => {
                const selected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      selected && styles.selectedCategoryChip,
                      selected && { backgroundColor: Colors.categories[cat] }
                    ]}
                    onPress={() => handleCategoryPress(cat)}
                    activeOpacity={0.8}
                  >
                    <Text style={[
                      styles.categoryText,
                      selected && styles.selectedCategoryText
                    ]}>{cat}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Action Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {expenseToEdit ? 'Save Changes' : 'Add Expense'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  backdrop: {
    flex: 1,
  },
  container: {
    backgroundColor: Colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    padding: 24,
    paddingBottom: 40, // Extra padding at bottom
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text,
  },
  closeButton: {
    padding: 8,
    backgroundColor: Colors.background,
    borderRadius: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  
  // --- TITLE INPUT STYLE ---
  input: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54, // Fixed height
    fontSize: 16,
    marginBottom: 12,
    color: Colors.text,
  },

  // --- AMOUNT INPUT STYLE (Matches Title Input) ---
  amountContainer: {
    backgroundColor: Colors.background, // Same background
    borderRadius: 12, // Same border radius
    height: 54, // Same fixed height
    marginBottom: 12,
    flexDirection: 'row', // Flex row to align $ and input
    alignItems: 'center', // Vertically center the content
    paddingHorizontal: 16, // Same horizontal padding
  },
  currencyPrefix: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
    marginRight: 4,
  },
  amountInput: {
    flex: 1, // Fill remaining space
    fontSize: 16,
    color: Colors.text,
    height: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 8,
    marginTop: 4,
  },
  
  // --- CATEGORY STYLES ---
  scrollWrapper: {
    height: 64,
    marginBottom: 24,
  },
  categoryContainer: {
    flexGrow: 0,
  },
  scrollContent: {
    paddingHorizontal: 4, // Prevents clipping
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: Colors.background,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    flexShrink: 0,
  },
  selectedCategoryChip: {
    borderColor: 'rgba(0,0,0,0.08)',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  selectedCategoryText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ExpenseForm;