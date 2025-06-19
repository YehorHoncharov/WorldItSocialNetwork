// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { TextInput, TouchableOpacity, View , Text, Image} from "react-native";
// import { Friend1 } from "../../../modules/chat/ui/friend1/friend";
// import { StyleSheet } from "react-native";


// export interface IContact {
//   id: string;
//   name: string;
//   surname: string;
//   image: string;
// }

// export function Search() {
//   const location = useLocation();
//   const [buttonClicked, setButtonClicked] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   // const { films, isLoading, error } = useGetAllFilms();
//   const [foundContacts, setFoundContacts] = useState<IContact[]>([]);

//   useEffect(() => {
//     if (location.hash === '#search-section') {
//       const scrollToElement = () => {
//         const element = document.getElementById('search-section');
//         if (element) {
//           element.scrollIntoView({ behavior: 'smooth' });
//         } else {
//           // Якщо елемент ще не завантажений, чекаємо 50мс і повторюємо спробу
//           setTimeout(scrollToElement, 50);
//         }
//       };
//       scrollToElement();
//     }
//   }, [location]);

//   function handleSearch() {
//     setButtonClicked(true);
//     if (!searchTerm.trim()) {
//       setFoundContacts([]);
//       return;
//     }

//     const filteredContact = contacts.filter((contact) =>
//       contact.Name.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     setFoundContacts(filteredContact);
//   }

//   function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
//     setSearchTerm(e.target.value);
//   }

//   function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
//     if (e.key === "Enter") {
//       handleSearch();
//     }
//   }

//   // if (isLoading) {
//   //   return (
//   //     <View style={styles.loaderContainer}>
//   //       <Text>Loading...</Text>
//   //     </View>
//   //   );
//   // }

//   // if (error) return <View style={styles.noResults}>Error loading films: {error}</View>;

//   return (
//     <View style={styles.search} id="search-section">
//       <h1 id="textSearch">Search</h1>

//       <View style={styles.serchInput}>
//         <Image
//           style={styles.searchBunny}
//           src=""
//           alt="Search icon"
//         />
//         <TextInput
//           className="input"
//           type="text"
//           placeholder="Enter the user name"
//           value={searchTerm}
//           onChange={handleInputChange}
//           onKeyPress={handleKeyPress}
//         />
//       </View>

//       <TouchableOpacity id="buttonFind" onPress={handleSearch}>
//         Find
//       </TouchableOpacity>

//       <View style={searchResults}>
//         {buttonClicked &&
//           (foundContacts.length > 0 ? (
//             <View style={filmsGrid}>
//               {foundContacts.map((contact, index) => {
//                 if (index <= 5) {
//                   return <Friend1/>
//                 }
//                 return null;
//               })}
//             </View>
//           ) : (
//             <Text style={noResults}>No results found. Please try again!</Text>
//           ))}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   search: {
//     width: '100%',
//     height: 473,
//     flexDirection: 'column',
//     alignItems: 'center',
//     gap: 41,
//   },
//   searchBunny: {
//     height: 97,
//     width: 154,
//     zIndex: 2,
//     paddingBottom: 120,
//   },
//   input: {
//     zIndex: 1,
//     width: 629,
//     height: 83,
//     borderRadius: 15,
//     paddingLeft: 30,
//     backgroundColor: '#ffffff',
//   },
//   serchInput: {
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   textSearch: {
//     fontFamily: 'MochiyPopPOne-Regular', // Убедись, что шрифт добавлен в проект
//     fontSize: 72,
//     color: '#ffffff',
//     marginTop: 50,
//   },
//   buttonFind: {
//     width: 275,
//     height: 77,
//     fontFamily: 'MochiyPopPOne-Regular', // Также убедись, что этот шрифт доступен
//     fontSize: 32,
//     fontWeight: 'bold', // 10 — недопустимо, используй 'bold' или числовое значение из RN
//     color: '#ffffff',
//     backgroundColor: '#5692A9', // Градиенты нужно делать через библиотеки
//     borderRadius: 15,
//     justifyContent: 'center',
//     alignItems: 'center',
//     opacity: 0.5, // перенёс сюда, так как у тебя был дубль стиля
//   },
//   filmsGrid: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 20,
//     marginTop: 20,
//     marginBottom: 20,
//   },
// });
