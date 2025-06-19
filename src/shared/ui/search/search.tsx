import React, { useEffect, useRef, useState } from "react";
import { ScrollView, TextInput, TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";
import { Friend1 } from "../../../modules/chat/ui/friend1/friend";

export interface IContact {
  id: string;
  name: string;
  surname: string;
  image: string;
}

export function Search() {
  // const location = useLocation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [foundContacts, setFoundContacts] = useState<IContact[]>([]);

  useEffect(() => {
    if (location.hash === "#search-section") {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  }, [location]);

  function handleSearch() {
    setButtonClicked(true);
    if (!searchTerm.trim()) {
      setFoundContacts([]);
      return;
    }
    // Implement your contact filtering logic here, e.g.:
    /*
    const filteredContact = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFoundContacts(filteredContact);
    */
  }

  function handleInputChange(e: NativeSyntheticEvent<TextInputChangeEventData>) {
    const text = e.nativeEvent.text;
    setSearchTerm(text);
  }

  return (
    <ScrollView ref={scrollViewRef} style={styles.scrollContainer}>
      <View style={styles.search} id="search-section">
        <Text style={styles.textSearch}>Search</Text>

        <View style={styles.searchInput}>
          <Image
            style={styles.searchBunny}
            source={{ uri: "https://via.placeholder.com/154x97" }}
            accessibilityLabel="Search icon"
          />
          <TextInput
            style={styles.input}
            placeholder="Enter the user name"
            value={searchTerm}
            onChange={handleInputChange}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
        </View>

        <TouchableOpacity style={styles.buttonFind} onPress={handleSearch}>
          <Text style={styles.buttonText}>Find</Text>
        </TouchableOpacity>

        <View>
          {buttonClicked &&
            (foundContacts.length > 0 ? (
              <View style={styles.filmsGrid}>
                {foundContacts.slice(0, 6).map((contact) => (
                  <Friend1 key={contact.id} user={name}/>
                ))}
              </View>
            ) : (
              <Text style={styles.noResults}>No results found. Please try again!</Text>
            ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  search: {
    width: "100%",
    height: 473,
    flexDirection: "column",
    alignItems: "center",
    gap: 41,
    padding: 20,
  },
  searchBunny: {
    height: 97,
    width: 154,
    zIndex: 2,
    paddingBottom: 120,
  },
  input: {
    zIndex: 1,
    width: 629,
    height: 83,
    borderRadius: 15,
    paddingLeft: 30,
    backgroundColor: "#ffffff",
    fontSize: 16,
  },
  searchInput: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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