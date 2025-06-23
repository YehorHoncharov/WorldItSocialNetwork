import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { IUser } from "../../../auth/types";
import { useUsers } from "../../../friends/hooks/useUsers";
import { useUserContext } from "../../../auth/context/user-context";
import SearchIcon from "../../../../shared/ui/icons/search";
import { Friend1 } from "../friend1/friend";
import { styles } from "./search.styles";


export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundContacts, setFoundContacts] = useState<IUser[]>([]);
  const { users } = useUsers();
  const { user } = useUserContext();
  
  useEffect(() => {

    if (!user) return
    const myFriends = users.filter((userF) =>
      user.friendship_to?.some(
        (f) => f.accepted === true && f.profile1_id === userF.id
      )
    );
    const friendsToAdd = users.filter((userF) =>
      user.friendship_from?.some(
        (f) => f.accepted === true && f.profile2_id === userF.id
      )
    );
    const contacts = myFriends.concat(friendsToAdd)
    setFoundContacts(contacts);
  }, [users]);

  function handleSearch() {
    if (!user) return
    if (!searchTerm.trim()) {
      setFoundContacts(users);
      return;
    }
    const myFriends = users.filter((userF) =>
      user.friendship_to?.some(
        (f) => f.accepted === true && f.profile1_id === userF.id
      )
    );
    const friendsToAdd = users.filter((userF) =>
      user.friendship_from?.some(
        (f) => f.accepted === true && f.profile2_id === userF.id
      )
    );
    const contacts = myFriends.concat(friendsToAdd)
    const filteredContacts = contacts.filter((user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFoundContacts(filteredContacts);
  }

  function handleInputChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    const text = e.nativeEvent.text;
    setSearchTerm(text);
    if (!user) return
    const myFriends = users.filter((userF) =>
      user.friendship_to?.some(
        (f) => f.accepted === true && f.profile1_id === userF.id
      )
    );
    const friendsToAdd = users.filter((userF) =>
      user.friendship_from?.some(
        (f) => f.accepted === true && f.profile2_id === userF.id
      )
    );
    const contacts = myFriends.concat(friendsToAdd)

    if (!text.trim()) {
      setFoundContacts(contacts);
    } else {
      const filteredContacts = contacts.filter((user) =>
        user.name?.toLowerCase().includes(text.toLowerCase())
      );
      setFoundContacts(filteredContacts);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchInput}>
        <SearchIcon style={{ width: 17, height: 17, }} />
        <TextInput
          style={styles.input}
          placeholder="Пошук"
          value={searchTerm}
          onChange={handleInputChange}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <FlatList
        data={foundContacts}
        scrollEnabled={false}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ gap: 10, flexGrow: 1 }}
        renderItem={({ item }) => <Friend1 userContact={item} />}
        ListEmptyComponent={
          <View>
            <Text style={styles.noResults}>Немає контактів</Text>
          </View>
        }
      />
    </View>
  );
}