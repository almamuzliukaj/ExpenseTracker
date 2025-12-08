import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../../constants/colors';
import { formatCurrency, formatDate } from '../../utils/formatUtils';
import { useExpenses } from '../../context/ExpenseContext';

const ExpenseItem = ({ id, title, amount, category, date, onEdit }) => {
  const { deleteExpense } = useExpenses();
  const categoryColor = Colors.categories[category] || Colors.primary;

  const handleDelete = () => {
    Alert.alert(
      "Delete Expense",
      "Are you sure you want to delete this?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteExpense(id) }
      ]
    );
  };

  return (
    <TouchableOpacity 
      onLongPress={handleDelete} 
      onPress={onEdit} // Trigger edit on tap
      activeOpacity={0.7}
    >
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <View style={[styles.colorDot, { backgroundColor: categoryColor }]} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.category}>{category} • {formatDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>{formatCurrency(amount)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16, // Increased radius
    padding: 20,      // Increased padding (was 16)
    marginVertical: 8, // Increased vertical margin
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 16, // More space
  },
  colorDot: {
    width: 14, // Bigger dot
    height: 14,
    borderRadius: 7,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18, // Bigger font (was 16)
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  category: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  amountContainer: {
    justifyContent: 'center',
  },
  amount: {
    fontSize: 18, // Bigger font (was 16)
    fontWeight: '700',
    color: Colors.text,
  },
});

export default ExpenseItem;