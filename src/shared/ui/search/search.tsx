import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Friend1 } from "../../../modules/chat/ui/friend1/friend";
import { useUsers } from "../../../modules/friends/hooks/useUsers";
import { IUser } from "../../../modules/auth/types";
import SearchIcon from "../icons/search";

// export interface IContact {
//   id: string;
//   name: string;
//   surname: string;
//   image: string;
// }

export function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundContacts, setFoundContacts] = useState<IUser[]>([]);
  const { users } = useUsers();

  //   useEffect(() => {
  //     setFoundContacts(users);
  //   }, [users]);

  // function handleSearch() {
  //     if (!searchTerm.trim()) {
  //       setFoundContacts(users);
  //       return;
  //     }
  //     const filteredContacts = users.filter((user) =>
  //       user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFoundContacts(filteredContacts);
  //   }

  //   function handleInputChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
  //     const text = e.nativeEvent.text;
  //     setSearchTerm(text);
  //     if (!text.trim()) {
  //       setFoundContacts(users);
  //     } else {
  //       const filteredContacts = users.filter((user) =>
  //         user.name?.toLowerCase().includes(text.toLowerCase())
  //       );
  //       setFoundContacts(filteredContacts);
  //     }
  //   }

  useEffect(() => {
    setFoundContacts(users);
  }, [users]);

  function handleSearch() {
    if (!searchTerm.trim()) {
      setFoundContacts(users);
      return;
    }
    const filteredContacts = users.filter((user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoundContacts(filteredContacts);
  }

  function handleInputChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    const text = e.nativeEvent.text;
    setSearchTerm(text);
    if (!text.trim()) {
      setFoundContacts(users);
    } else {
      const filteredContacts = users.filter((user) =>
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
        renderItem={({ item }) => <Friend1 user={item} />}
        ListEmptyComponent={
          <View>
            <Text style={styles.noResults}>Немає контактів</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
  },
  searchInput: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#CDCED2",
    flexDirection: "row",
    paddingLeft: 15,
    marginBottom: 10
  },
  input: {
    width: "95%",
    height: 42,
    borderRadius: 15,
    paddingLeft: 15,
    backgroundColor: "#ffffff",
    fontSize: 16,
    zIndex: 1,
  },
  textSearch: {
    fontFamily: "MochiyPopPOne-Regular",
    fontSize: 72,
    color: "#ffffff",
    marginTop: 50,
    textAlign: "center",
  },
  buttonFind: {
    width: 275,
    height: 77,
    backgroundColor: "#5692A9",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: "MochiyPopPOne-Regular",
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  filmsGrid: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  noResults: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
  },
});

// import React, { useState, useEffect } from "react";
// import { TextInput, TouchableOpacity, View, Text, StyleSheet, FlatList } from "react-native";
// import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
// import { Friend1 } from "../../../modules/chat/ui/friend1/friend";
// import { useUsers } from "../../../modules/friends/hooks/useUsers";
// import { IUser } from "../../../modules/auth/types";
// import SearchIcon from "../icons/search";

// export function Search() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [foundContacts, setFoundContacts] = useState<IUser[]>([]);
//   const { users } = useUsers();

//   // Устанавливаем всех пользователей при монтировании компонента
//   useEffect(() => {
//     setFoundContacts(users);
//   }, [users]);

//   function handleSearch() {
//     if (!searchTerm.trim()) {
//       setFoundContacts(users);
//       return;
//     }
//     const filteredContacts = users.filter((user) =>
//       user.name?.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFoundContacts(filteredContacts);
//   }

//   function handleInputChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
//     const text = e.nativeEvent.text;
//     setSearchTerm(text);
//     if (!text.trim()) {
//       setFoundContacts(users);
//     } else {
//       const filteredContacts = users.filter((user) =>
//         user.name?.toLowerCase().includes(text.toLowerCase())
//       );
//       setFoundContacts(filteredContacts);
//     }
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.searchInput}>
//         <SearchIcon style={{ width: 15, height: 15 }} />
//         <TextInput
//           style={styles.input}
//           placeholder="Enter the user name"
//           value={searchTerm}
//           onChange={handleInputChange}
//           onSubmitEditing={handleSearch}
//           returnKeyType="search"
//         />
//       </View>
//       {/* <FlatList
//         data={foundContacts}
//         scrollEnabled={false}
//         keyExtractor={(item) => `${item.id}`}
//         contentContainerStyle={{ gap: 10, flexGrow: 1 }}
//         renderItem={({ item }) => <Friend1 user={item} />}
//         ListEmptyComponent={
//           <View>
//             <Text style={styles.noResults}>Немає контактів</Text>
//           </View>
//         }
//       /> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     // alignItems: "center",
//   },
//   searchInput: {
//     width: "90%",
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderRadius: 10,
//     borderColor: "#CDCED2",
//   },
//   input: {
//     width: "90%",
//     height: 83,
//     borderRadius: 15,
//     paddingLeft: 30,
//     backgroundColor: "#ffffff",
//     fontSize: 16,
//   },
//   noResults: {
//     color: "#ffffff",
//     fontSize: 16,
//     textAlign: "center",
//   },
// });