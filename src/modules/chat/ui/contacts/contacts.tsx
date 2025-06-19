import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { useUsers } from '../../../friends/hooks/useUsers';
import { Friend1 } from '../friend1/friend';
import { Search } from '../../../../shared/ui/search/search';
import PeopleIcon from '../../../../shared/ui/icons/people';
import { styles } from './contacts.styles';

export function ContactsScreen({ scrollable = true }: { scrollable?: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { users } = useUsers();


  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()),
      user.surname?.toLowerCase().includes(searchQuery.toLowerCase())
     )
  });
  
  const content = (
    <View style={styles.container}>
      <View style={styles.header}>
        <PeopleIcon style={{ borderColor: '#81818D', width: 20, height: 20 }} />
        <Text style={styles.title}>Контакти</Text>
      </View>
      {/* <Search /> */}
      <FlatList
        data={filteredUsers}
        scrollEnabled={false}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ gap: 10, flexGrow: 1 }}
        renderItem={({ item }) => <Friend1 user={item} />}
        ListEmptyComponent={
          <View>
            <Text>Немає контактів</Text>
          </View>
        }
      />
    </View>
  )

   return scrollable ? <ScrollView overScrollMode="never">{content}</ScrollView> : content;
}