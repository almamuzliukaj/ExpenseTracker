import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../../constants/colors';
import { formatCurrency } from '../../utils/formatUtils';

const Chart = ({ expenses }) => {
  // 1. Calculate totals per category
  const categoryTotals = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const totalSpending = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  // 2. Prepare data for rendering
  const data = Object.keys(categoryTotals).map(cat => ({
    label: cat,
    value: categoryTotals[cat],
    color: Colors.categories[cat] || Colors.primary,
    percentage: totalSpending > 0 ? (categoryTotals[cat] / totalSpending) * 100 : 0
  })).sort((a, b) => b.value - a.value); // Sort highest to lowest

  if (totalSpending === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No data to display</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Spending Breakdown</Text>
      <Text style={styles.total}>{formatCurrency(totalSpending)}</Text>
      
      <View style={styles.chartContainer}>
        {data.map((item) => (
          <View key={item.label} style={styles.barRow}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.percentage}>{item.percentage.toFixed(1)}%</Text>
            </View>
            <View style={styles.barBackground}>
              <View 
                style={[
                  styles.barFill, 
                  { width: `${item.percentage}%`, backgroundColor: item.color }
                ]} 
              />
            </View>
            <Text style={styles.amount}>{formatCurrency(item.value)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  total: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 20,
  },
  chartContainer: {
    gap: 12,
  },
  barRow: {
    marginBottom: 8,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.text,
  },
  percentage: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  barBackground: {
    height: 8,
    backgroundColor: '#F2F2F7',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  amount: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  emptyText: {
    color: Colors.textSecondary,
  }
});

export default Chart;