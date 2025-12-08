import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../../constants/colors';

const CATEGORIES = ['All', 'Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Other'];

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always" // allow taps while keyboard is open
      >
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.chip,
              selectedCategory === cat && styles.activeChip,
              selectedCategory === cat && cat !== 'All' && { backgroundColor: Colors.categories[cat] || Colors.primary }
            ]}
            onPress={() => onSelectCategory(cat)}
            activeOpacity={0.8}
          >
            <Text style={[
              styles.text,
              selectedCategory === cat && styles.activeText
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    // make sure the wrapper doesn't clip contents and allows vertical padding
    paddingVertical: 8,
  },
  container: {
    // don't force a small maxHeight — let padding/vertical space decide
    paddingLeft: 16,
  },
  contentContainer: {
    paddingRight: 16,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#E5E5EA', // iOS System Gray 5
    marginRight: 10,
    // Prevent shrinking so full label is always visible
    flexShrink: 0,
  },
  activeChip: {
    // Active chip color overwritten when category color exists
    // fallback color:
    backgroundColor: Colors.primary,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  activeText: {
    color: '#FFFFFF',
  },
});

export default CategoryFilter;
