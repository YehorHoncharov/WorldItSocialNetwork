import { ScrollView, View, Image, Text, FlatList } from "react-native";
import { useUserContext } from "../../../auth/context/user-context";

import OfflineIcon from "../../../../shared/ui/icons/offline-circle";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./friend-profile.styles";
import { IUser } from "../../../auth/types";
import { Album } from "../album/album";
import { useAlbums } from "../../hooks/useAlbums";
import { useEffect } from "react";
import { AlbumHeader } from "../my/album-header/album-header";

export function FriendProfile(props: IUser) {
  const { user } = useUserContext();
  const { albums } = useAlbums();
  

  return (
    <ScrollView>
      <View>
        <View style={[styles.container, { flexShrink: 0 }]}>
          <View style={styles.profileContainer}>
            <Image style={styles.profileImage} source={{ uri: props.image }} />
            <OfflineIcon style={styles.imageOnline} />
          </View>
        </View>

        {!user ? (
          <Text>Нету пользователя</Text>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 24,
                color: "#070A1C",
                fontWeight: "700",
              }}
            >
              {user.name} {user.surname}
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#070A1C",
                fontWeight: "500",
                alignSelf: "center",
              }}
            >
              @{user.username}
            </Text>
          </View>
        )}

        <View>
          <View style={{ flexDirection: "column", borderRightWidth: 1 }}>
            <Text style={{ fontWeight: 700, fontSize: 20 }}>3</Text>
            <Text style={{ fontWeight: 500, fontSize: 16, color: "#81818D" }}>
              Дописи
            </Text>
          </View>

          <View style={{ flexDirection: "column", borderRightWidth: 1 }}>
            <Text style={{ fontWeight: 700, fontSize: 20 }}>12.1к</Text>
            <Text style={{ fontWeight: 500, fontSize: 16, color: "#81818D" }}>
              Читачів
            </Text>
          </View>

          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontWeight: 700, fontSize: 20 }}>222</Text>
            <Text style={{ fontWeight: 500, fontSize: 16, color: "#81818D" }}>
              Друзі
            </Text>
          </View>
        </View>

        <View style={{}}>
          <Button label="Підтвердити" style={styles.confirmButton}>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 14,
                color: "white",
                backgroundColor: "#543C52",
              }}
            >
              Підтвердити
            </Text>
          </Button>
          <Button label="Видалити" style={styles.deleteButton}>
            <Text
              style={{
                fontWeight: 500,
                fontSize: 14,
                color: "#543C52",
                backgroundColor: "white",
                borderColor: "#543C52",
              }}
            >
              Видалити
            </Text>
          </Button>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View>
          <Image
            source={require("../../../../shared/ui/images/pictures-modal.png")}
          />
          <Text style={{ fontWeight: 500, fontSize: 20, color: "#81818D" }}>
            Альбоми
          </Text>
        </View>
        <Text style={{ fontWeight: 500, fontSize: 16, color: "#543C52" }}>
          Дивитись всі
        </Text>
      </View>
      {/* <FlatList
        data={userAlbums.slice(1)}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
        renderItem={({ item }) => (
          <Album
            id={item.id}
            name={item.name}
            theme={item.theme}
            year={item.year}
            authorId={item.authorId}
            images={item.images}
          />
        )}
        ListEmptyComponent={
          <View>
            <NoAlbums />
          </View>
        }
      /> */}
    </ScrollView>
  );
}
