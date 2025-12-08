import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ExpenseProvider } from './src/context/ExpenseContext';
import HomeScreen from './src/screens/HomeScreen';
import StatsScreen from './src/screens/StatsScreen';
import { Colors } from './src/constants/colors';

// Simple custom tab component to avoid navigation dependencies
// This gives you that "iOS" bottom bar look
const CustomTabBar = ({ activeTab, onTabPress }) => (
  <View style={styles.tabBar}>
    <TouchableOpacity 
      style={styles.tabItem} 
      onPress={() => onTabPress('Home')}
    >
      <Text style={[styles.tabText, activeTab === 'Home' && styles.activeTabText]}>
        Home
      </Text>
      {activeTab === 'Home' && <View style={styles.activeDot} />}
    </TouchableOpacity>
    
    <TouchableOpacity 
      style={styles.tabItem} 
      onPress={() => onTabPress('Stats')}
    >
      <Text style={[styles.tabText, activeTab === 'Stats' && styles.activeTabText]}>
        Stats
      </Text>
      {activeTab === 'Stats' && <View style={styles.activeDot} />}
    </TouchableOpacity>
  </View>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <ExpenseProvider>
      <View style={styles.container}>
        <View style={styles.screenContainer}>
          {activeTab === 'Home' ? <HomeScreen /> : <StatsScreen />}
        </View>
        
        <SafeAreaView style={styles.bottomNavContainer}>
          <CustomTabBar activeTab={activeTab} onTabPress={setActiveTab} />
        </SafeAreaView>
      </View>
    </ExpenseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
  },
  bottomNavContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  tabItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 4, // <-- FIXED
  },
});
