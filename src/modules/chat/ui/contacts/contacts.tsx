import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import PeopleIcon from "../../../../shared/ui/icons/people";
import { styles } from "./contacts.styles";
import { useSocketContext } from "../../context/socketContext";
import { Search } from "../search/search";

export function ContactsScreen({ scrollable = true }: { scrollable?: boolean }) {
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!socket) return;
        socket.on("chatUpdate", data => {});
        return () => {
            socket.off("chatUpdate");
        };
    }, [socket]);

    const content = (
        <View style={styles.container}>
            <View style={styles.header}>
                <PeopleIcon style={{ borderColor: "#81818D", width: 20, height: 20 }} />
                <Text style={styles.title}>Контакти</Text>
            </View>
            <Search />
        </View>
    );

    return scrollable ? <ScrollView overScrollMode="never">{content}</ScrollView> : content;
}
