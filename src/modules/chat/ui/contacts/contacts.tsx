import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet } from 'react-native';

interface Contact {
  id: string;
  name: string;
  image: string;
}

const contacts: Contact[] = [
  { id: '1', name: 'kotik', image: 'https://bannerplus.ru/files/img/pics/veselye-kartinki-na-avu/veselye-kartinki-na-avu-0.webp' },
  { id: '2', name: 'kotik', image: 'https://bannerplus.ru/files/img/pics/veselye-kartinki-na-avu/veselye-kartinki-na-avu-0.webp' },
  { id: '3', name: 'kotik', image: 'https://bannerplus.ru/files/img/pics/veselye-kartinki-na-avu/veselye-kartinki-na-avu-0.webp' },
  { id: '4', name: 'kotik', image: 'https://bannerplus.ru/files/img/pics/veselye-kartinki-na-avu/veselye-kartinki-na-avu-0.webp' },
  { id: '5', name: 'kotik', image: 'https://bannerplus.ru/files/img/pics/veselye-kartinki-na-avu/veselye-kartinki-na-avu-0.webp' },
  { id: '6', name: 'kotik', image: 'https://bannerplus.ru/files/img/pics/veselye-kartinki-na-avu/veselye-kartinki-na-avu-0.webp' },
  { id: '7', name: 'kotik', image: 'https://bannerplus.ru/files/img/pics/veselye-kartinki-na-avu/veselye-kartinki-na-avu-0.webp' },
];


export function ContactsScreen(){
  const [searchQuery, setSearchQuery] = useState('')

  const filteredContacts = contacts.filter(contact =>
    contact.name.includes(searchQuery)
  );

  function renderItem({item} : {item: Contact}){
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
     <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.contactList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  contactList: {
    flex: 1,
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
