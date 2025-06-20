import React, { useState } from 'react';
import { View, Text, FlatList, ScrollView, Image } from 'react-native';
import { useUsers } from '../../../friends/hooks/useUsers';
import { Friend1 } from '../friend1/friend';
import PeopleIcon from '../../../../shared/ui/icons/people';
import { styles } from './messages.styles';
import { Friend2 } from '../friend2/friend';


export function MessagesScreen({ scrollable = true }: { scrollable?: boolean }) {
    const [searchQuery, setSearchQuery] = useState('');
    const { users } = useUsers();

    const filteredUsers = users.filter((user) => {
        return (
            user.name?.toLowerCase().includes(searchQuery.toLowerCase()),
            user.surname?.toLowerCase().includes(searchQuery.toLowerCase())
        )
    });

    const content = (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require("../../../../shared/ui/images/chat.png")}
                />
                <Text style={styles.title}>Повідомлення</Text>
            </View>

            <FlatList
                data={filteredUsers}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ gap: 10, flexGrow: 1 }}
                renderItem={({ item }) => <Friend2 user={item} />}
                ListEmptyComponent={
                    <View>
                        <Text>Немає контактів</Text>
                    </View>
                }
            />
        </View>
    )

    return scrollable ? <ScrollView overScrollMode="never">{content}</ScrollView> : content;
}