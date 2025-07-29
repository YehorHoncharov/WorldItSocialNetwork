import { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Friend2 } from '../friend2/friend';
import { useUserContext } from '../../../auth/context/user-context';
import { useChats } from '../../hooks/useChats';
import { useRouter } from 'expo-router';
import { styles } from './group-chats.style';
import { Chat } from '../../types/socket';


export function GroupChats({ scrollable = true }: { scrollable?: boolean }) {
    const { user } = useUserContext();
    const { chats } = useChats();
    const [groupChats, setGroupChats] = useState<Chat[]>([]);
    const router = useRouter();

    useEffect(() => {
        if (!user || !chats) return;

        const userGroupChats = chats.filter(chat =>
            !chat.is_personal_chat &&
            chat.members.some(member => member.profile_id === user.id)
        );

        setGroupChats(userGroupChats);
    }, [chats, user]);

    const content = (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../../../shared/ui/images/chat.png")}
                />
                <Text style={styles.title}>Групові чати</Text>
            </View>

            <FlatList
                data={groupChats}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ gap: 10, flexGrow: 1 }}
                renderItem={({ item }) => {


                    const lastMessage = item.chat_messages?.at(-1);

                    return (
                        <TouchableOpacity onPress={() => {

                            router.push({
                                pathname: "/chatGroup",
                                params: {
                                    chat_id: item.id,
                                    name: item.name,
                                    avatar: "uploads/user.png",
                                    lastAtMessage: lastMessage?.sent_at.toString()
                                }
                            });

                        }}>
                            <Friend2 user={{
                                name: item.name,
                                image: item.avatar || "uploads/user.png"
                            }}
                                lastMessage={lastMessage?.content} />
                        </TouchableOpacity>
                    );
                }}
                ListEmptyComponent={
                    <View>
                        <Text>Немає повідомлень</Text>
                    </View>
                }
            />
        </View>
    )

    return scrollable ? <ScrollView overScrollMode="never">{content}</ScrollView> : content;
}