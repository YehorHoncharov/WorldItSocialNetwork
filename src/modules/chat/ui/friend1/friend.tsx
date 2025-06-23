import { View, Image, Text, TouchableOpacity } from 'react-native';
import { styles } from './friend.styles';
import { IUser } from '../../../auth/types';
import { API_BASE_URL } from '../../../../settings';
import { useRouter } from 'expo-router';
import { POST } from '../../../../shared/api/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { useUserContext } from '../../../auth/context/user-context';

export function Friend1({ userContact }: { userContact: IUser }) {
  const router = useRouter()
  const { user } = useUserContext()
  const [token, setToken] = useState<string>("")

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("token")
      if (!token) return
      setToken(token)
    }
    getToken()
  }, [token])

  function onPress() {

    async function createChat() {
      if (!user) return
      console.log("beeeeeeeeeeeeee")
      console.log(token)
      const result = await POST({
        endpoint: `${API_BASE_URL}/chats/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        token: token,
        body: {
          name: userContact.name,
          is_personal_chat: true,
          avatar: "uploads/user.png",
          members: [user, userContact],
        },
      })

    }
    createChat()
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{ uri: API_BASE_URL + "/" + userContact?.image || '../../../../shared/ui/images/user.png' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{userContact?.name || 'Anonymous'}</Text>
        <Text style={styles.name}>{userContact?.surname || 'Anonymous'}</Text>
      </View>
    </TouchableOpacity>
  );
}