import { SafeAreaView } from "react-native-safe-area-context"
import { usePosts } from "../post/hooks/use-get-post"
import Post from "../post/ui/main-page/main.page"
import { View } from "react-native"

export function Homepage(){
    const {posts} = usePosts()
    console.log("posts empty")
    console.log(posts)
    return (
        <View>
            {posts.map((post) => (
                <Post key={post.id} 
                id={post.id}
                name={post.name}
                text={post.text}
                images={post.images}
                user={post.user}/>
            ))}
        </View>
    )
}