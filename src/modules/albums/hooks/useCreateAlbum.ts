// import { useEffect, useState } from "react";
// import { useUserContext } from "../../auth/context/user-context";
// import { POST } from "../../../shared/api/post";
// import { API_BASE_URL } from "../../../settings";
// import { Alert } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { AlbumUpdateBody } from "../types/albums.types";


// export async function useCreateAlbum(props: AlbumUpdateBody) {
//   const [isLoading, setIsLoading] = useState(false);
//   const [token, setToken] = useState<string | null>(null);
//   const [name, setName] = useState("");
//   const [theme, setTheme] = useState<string>();

//     const resetForm = () => {
//     setName("");
//     setTheme(undefined);
//   };

//   async function getToken() {
//     try {
//       const storedToken = await AsyncStorage.getItem("token");
//       setToken(storedToken);
//     } catch (error) {
//       console.error("Error retrieving token from AsyncStorage:", error);
//     }
//   }

//   useEffect(() => {
//     getToken()
//   })

//   try {
//     setIsLoading(true);

//     if (!token) {
//       return
//     }

//     const response = await POST({
//       endpoint: `${API_BASE_URL}/albums/create`,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       token: token,
//       body: {
//         name: name,
//         topic: props.tags,
//       },
//     });

//     if (response.status === "success") {
//         console.log("Album created, calling refetch");
//         Alert.alert("Успіх", "Альбом успішно створено!");
//         resetForm();
//         // await refetch();
//         onClose();
//       }
//   } catch (error) {
//     console.error("Error creating album:", error);
//     Alert.alert("Помилка", "Не вдалося створити альбом. Спробуйте ще раз.");
//   } finally {
//     setIsLoading(false);
//   }

//   return { isLoading, useCreateAlbum }
// }