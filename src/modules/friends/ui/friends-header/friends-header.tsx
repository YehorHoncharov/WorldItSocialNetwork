import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

type FriendsHeaderProps = {
  activeTab: string;
  onTabPress: (tab: string) => void;
};

export function FriendsHeader(props: FriendsHeaderProps) {
    const { activeTab, onTabPress } = props
  return (
    <View style={[styles.tabContainer, { paddingHorizontal: 0 }]}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('main')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'main' && styles.tabTextActive
        ]}>
          Головна
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('requests')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'requests' && styles.tabTextActive
        ]}>
          Запити
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('recommendations')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'recommendations' && styles.tabTextActive
        ]}>
          Рекомендації
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => onTabPress('all')}
      >
        <Text style={[
          styles.tabText,
          activeTab === 'all' && styles.tabTextActive
        ]}>
          Всі друзі
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#81818D',
  },
  tabTextActive: {
    color: '#070A1C',
    fontWeight: '700',
    borderBottomWidth: 2,
    borderBottomColor: '#070A1C',
    paddingBottom: 4,
  },
});