import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useUsers } from '../../../friends/hooks/useUsers';
import { Friend1 } from '../friend1/friend';
import PeopleIcon from '../../../../shared/ui/icons/people';
import { styles } from './messages.styles';
import { Friend2 } from '../friend2/friend';
import { useSocketContext } from '../../context/socketContext';
import { IUser } from '../../../auth/types';
import { useUserContext } from '../../../auth/context/user-context';
import { useChats } from '../../hooks/useChats';
import { ChatGroupMembers } from '../../types/socket';
import { useRouter } from 'expo-router';


export function MessagesScreen({ scrollable = true }: { scrollable?: boolean }) {
    const [searchQuery, setSearchQuery] = useState('');
    const { user } = useUserContext();
    const { chats } = useChats();
    const [chatMembers, setChatMembers] = useState<IUser[]>([]);
    const router = useRouter();
    const { users } = useUsers()

    useEffect(() => {
        if (!user || !chats || !users) return;
        // console.log(JSON.stringify(user, null, 2));
        const membersIds: number[] = [];
        chats.forEach((chat) => {
            if (chat.is_personal_chat) {
                chat.members.forEach((member) => {
                    if (member.profile_id !== user.id) {
                        user.chat_group_members?.forEach((chatGroup) => {
                            if (chatGroup.chat_groupId === chat.id){
                                membersIds.push(member.profile_id);
                            }
                        })
                        
                    }
                });
            }

        });
        const filteredUsers = users.filter((user) => {
            return membersIds.includes(user.id)
        })

        setChatMembers(filteredUsers);
        
    }, [chats, user, users]);

    const content = (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../../../shared/ui/images/chat.png")}
                />
                <Text style={styles.title}>Повідомлення</Text>
            </View>

            <FlatList
                data={chatMembers}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ gap: 10, flexGrow: 1 }}
                renderItem={({ item }) => {
                const chat = chats.find(c =>
                    c.is_personal_chat &&
                    c.members.some(m => m.profile_id === item.id)
                );

                const lastMessage = chat?.chat_messages?.at(-1);

                return (
                    <TouchableOpacity onPress={() => {
                    if (chat) {
                        router.push({
                        pathname: "/chat",
                        params: {
                            chat_id: chat.id,
                            name: item.auth_user.first_name,
                            avatar: item.avatar?.at(-1)?.image
                        }
                        });
                    }
                    }}>
                    <Friend2 user={{name: item.auth_user.first_name ?? "User", image: item.avatar?.at(-1)?.image ?? "uploads/user.png"}} lastMessage={lastMessage?.content} />
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