import { View, Text, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import { AddAlbumModal } from "../add-album-modal/add-album-modal";
import { ModalPost } from "../../../post/ui/modal-post/modal-post";

export function NoAlbums() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        height: 72,
        width: "100%",
        backgroundColor: "#ffffff",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CDCED2",
        borderRadius: 10,
      }}
    >
      <View style={{ flexDirection: "row", gap: 90 }}>
        <Text style={{ fontWeight: 500, fontSize: 16, paddingTop: 7 }}>
          Немає ще жодного альбому
        </Text>
        <TouchableOpacity
          style={{ width: 40, height: 40 }}
          onPress={() => setModalVisible(true)}
        >
          <Image
            style={{ width: 40.2, height: 40 }}
            source={require("../../../../shared/ui/images/plus-in-circle.png")}
          />
        </TouchableOpacity>
        <AddAlbumModal
          modalVisible={modalVisible}
          changeVisibility={() => setModalVisible(true)}
          onClose={() => setModalVisible(false)}
        />
      </View>
    </View>
  );
}
