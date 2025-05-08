import { View, TouchableOpacity, Image } from "react-native";
import { Link } from 'expo-router';
import { styles } from "./footer.styles";


export function Footer(){
    return(
        <View style={styles.footer}>
            <TouchableOpacity>
                <Link href="/home" asChild>
                    <Image style={styles.home} source={require('../images/home.png')}/>
                </Link>
            </TouchableOpacity>

            <TouchableOpacity>
                <Link href="/myposts" asChild>
                    <Image style={styles.myposts} source={require('../images/my-posts.png')}/>
                </Link>
            </TouchableOpacity>

            <TouchableOpacity>
                <Link href="/friends" asChild>
                    <Image style={styles.friends} source={require('../images/friends.png')}/>
                </Link>
            </TouchableOpacity>

            <TouchableOpacity>
                <Link href="/chats" asChild>
                    <Image style={styles.chats} source={require('../images/chats.png')}/>
                </Link>
            </TouchableOpacity>
        </View>
        
    )
}