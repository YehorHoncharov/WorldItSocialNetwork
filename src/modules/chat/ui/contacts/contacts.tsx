import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';

import { useUsers } from '../../../friends/hooks/useUsers';
import { Friend1 } from '../friend1/friend';
import { IUser } from '../../../auth/types';


export function ContactsScreen(){
  const [searchQuery, setSearchQuery] = useState('')
  const { users } = useUsers()

  // const filteredContacts = contacts.filter(contact =>
  //   contact.name.includes(searchQuery)
  // );

  function renderItem({item} : {item: IUser}){
    return(
        <View style={styles.contactItem}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          <Text style={styles.contactName}>{item.name}</Text>
    </View>
    )
};

  return (
    <View style={styles.container}>
        <View>
            {/* <Image source={require("../../../../shared/ui/images/people.png")} style={{width: 20, height: 20}}/> */}
            <Text style={{ fontSize: 20, color: '#81818D', fontWeight: 500 }}>Контакты</Text>
        </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {/* <Search/> */}
      <FlatList
                data={users}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ gap: 10, flexGrow: 1 }}
                renderItem={renderItem}
                ListEmptyComponent={
                    <View>
                        <Text>Немає контактів</Text>
                    </View>
                }
            />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchInput: {
    width: '90%',
    // width: 343,
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  contactList: {
    flex: 1,
    // width: '90%',
    width: 343,
    gap: 16
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactName: {
    fontSize: 16,
  },
});
