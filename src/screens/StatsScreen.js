import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, ScrollView } from 'react-native';
import Chart from '../components/ui/Chart';
import { Colors } from '../constants/colors';
import { useExpenses } from '../context/ExpenseContext';

const StatsScreen = () => {
  const { expenses } = useExpenses();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Statistics</Text>
        <Chart expenses={expenses} />
        
        {/* Placeholder for future stats */}
        <View style={styles.insightCard}>
          <Text style={styles.insightTitle}>Monthly Budget</Text>
          <Text style={styles.insightText}>Keep your spending under control. You spent $120 less than last week.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: Colors.text,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  insightCard: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 20,
    margin: 16,
  },
  insightTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  insightText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 14,
    lineHeight: 20,
  }
});

export default StatsScreen;