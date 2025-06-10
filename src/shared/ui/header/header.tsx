// import { View, Image, TouchableWithoutFeedback } from "react-native";
// import W from "../icons/logo/w";
// import O from "../icons/logo/o";
// import R from "../icons/logo/r";
// import L from "../icons/logo/l";
// import D from "../icons/logo/d";
// import I from "../icons/logo/i";
// import T from "../icons/logo/t";
// import { styles } from "./header.styles";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import { useState } from "react";
// import { IInputPasswordProps } from "../input/input.type";
// import { MyPublicationModal } from "../../../modules/my_publications/modal/modal";
// import { useUserContext } from "../../../modules/auth/context/user-context";

// function Header() {
// 	const router = useRouter();
// 	const { user } = useUserContext();
// 	const [modalOpened, setModalOpened] = useState<boolean>(false);

// 	function Logout() {
// 		try {
// 			const deleteToken = AsyncStorage.removeItem("token");
// 		} catch {
// 			console.log("ошибки выхода");
// 		}
// 	}
// 	function onReg() {
// 		router.navigate("/settings");
// 	}

// 	return (
// 		<View style={styles.container}>
// 			{modalOpened ? (
// 				<MyPublicationModal
// 					modalVisible={modalOpened}
// 					changeVisibility={() => {
// 						setModalOpened(!modalOpened);
// 					}}
// 				></MyPublicationModal>
// 			) : null}
// 			<View
// 				style={{
// 					flexDirection: "row",
// 					gap: 5,
// 					paddingLeft: 16,
// 					alignItems: "center",
// 					justifyContent: "center",
// 				}}
// 			>
// 				<Image
// 					style={styles.worldItLogo}
// 					source={require("../../ui/images/world-it-logo.png")}
// 				/>
// 				<View style={{ flexDirection: "row", gap: 1, padding: 2 }}>
// 					<W style={styles.w} />
// 					<O style={styles.o} />
// 					<R style={styles.r} />
// 					<L style={styles.l} />
// 					<D style={styles.d} />
// 				</View>
// 				<View style={{ flexDirection: "row", gap: 1, paddingTop: 5 }}>
// 					<I style={styles.i} />
// 					<T style={styles.t} />
// 				</View>
// 			</View>
// 			<View style={{ flexDirection: "row", gap: 8, marginRight: 16 }}>
// 				{user ? 
// 					<TouchableWithoutFeedback
// 						onPress={() => {
// 							setModalOpened(!modalOpened);
// 						}}
// 					>
// 						<Image
// 							style={styles.plus}
// 							source={require("../images/plus-in-circle.png")}
// 						/>
// 					</TouchableWithoutFeedback> : null}
				
// 				<TouchableWithoutFeedback onPress={onReg}>
// 					<Image
// 						style={styles.settings}
// 						source={require("../images/settings-in-circle.png")}
// 					/>
// 				</TouchableWithoutFeedback>
// 				<TouchableWithoutFeedback
// 					onPress={
// 						Logout}
// 				>
// 					<Image
// 						style={styles.exit}
// 						source={require("../images/exit-in-circle.png")}
// 					/>
// 				</TouchableWithoutFeedback>
// 			</View>
// 		</View>
// 	);
// }

// function HeaderSecond(props: IInputPasswordProps) {
// 	const { label, error, style, ...otherProps } = props;

// 	const [hidden, setHidden] = useState(true);

// 	return (
// 		<View style={styles.container2}>
// 			<View
// 				style={{
// 					flexDirection: "row",
// 					gap: 5,
// 					paddingLeft: 16,
// 					alignItems: "center",
// 					justifyContent: "center",
// 				}}
// 			>
// 				<Image
// 					style={styles.worldItLogo}
// 					source={require("../../ui/images/world-it-logo.png")}
// 				/>
// 				<View style={{ flexDirection: "row", gap: 1, padding: 2 }}>
// 					<W style={styles.w} />
// 					<O style={styles.o} />
// 					<R style={styles.r} />
// 					<L style={styles.l} />
// 					<D style={styles.d} />
// 				</View>
// 				<View style={{ flexDirection: "row", gap: 1, paddingTop: 5 }}>
// 					<I style={styles.i} />
// 					<T style={styles.t} />
// 				</View>
// 			</View>
// 		</View>
// 	);
// }

// Header.HeaderSecond = HeaderSecond;

// export { Header };


import { View, Image, TouchableWithoutFeedback } from "react-native";
import W from "../icons/logo/w";
import O from "../icons/logo/o";
import R from "../icons/logo/r";
import L from "../icons/logo/l";
import D from "../icons/logo/d";
import I from "../icons/logo/i";
import T from "../icons/logo/t";
import { styles } from "./header.styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { MyPublicationModal } from "../../../modules/my_publications/modal/modal";
import { useUserContext } from "../../../modules/auth/context/user-context";
import { AddAlbumModal } from "../../../modules/albums/ui/add-album-modal/add-album-modal";

interface HeaderProps {
  actionType?: 1 | 2; // 1 пости, 2 фльбоми
}

function Header() { 
  const router = useRouter();
  const { user, refetchLogout } = useUserContext();
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  function onReg() {
    router.navigate("/settings");
  }


  return (
    <View style={styles.container}>
      {modalOpened ? (
        <MyPublicationModal
          modalVisible={modalOpened}
          changeVisibility={() => {
            setModalOpened(!modalOpened);
          }}
        ></MyPublicationModal>
      ) : null}
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          paddingLeft: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.worldItLogo}
          source={require("../../ui/images/world-it-logo.png")}
        />
        <View style={{ flexDirection: "row", gap: 1, padding: 2 }}>
          <W style={styles.w} />
          <O style={styles.o} />
          <R style={styles.r} />
          <L style={styles.l} />
          <D style={styles.d} />
        </View>
        <View style={{ flexDirection: "row", gap: 1, paddingTop: 5 }}>
          <I style={styles.i} />
          <T style={styles.t} />
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 8, marginRight: 16 }}>
        {user ? (
          <TouchableWithoutFeedback
            onPress={() => {
              setModalOpened(!modalOpened);
            }}
          >
            <Image
              style={styles.plus}
              source={require("../images/plus-in-circle.png")}
            />
          </TouchableWithoutFeedback>
        ) : null}
        <TouchableWithoutFeedback onPress={onReg}>
          <Image
            style={styles.settings}
            source={require("../images/settings-in-circle.png")}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={refetchLogout}>
          <Image
            style={styles.exit}
            source={require("../images/exit-in-circle.png")}
          />
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

function HeaderSecond(props: IInputPasswordProps) {
  const { label, error, style, ...otherProps } = props;
  const [hidden, setHidden] = useState(true);

  return (
    <View style={styles.container2}>
      <View
        style={{
          flexDirection: "row",
          gap: 5,
          paddingLeft: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.worldItLogo}
          source={require("../../ui/images/world-it-logo.png")}
        />
        <View style={{ flexDirection: "row", gap: 1, padding: 2 }}>
          <W style={styles.w} />
          <O style={styles.o} />
          <R style={styles.r} />
          <L style={styles.l} />
          <D style={styles.d} />
        </View>
        <View style={{ flexDirection: "row", gap: 1, paddingTop: 5 }}>
          <I style={styles.i} />
          <T style={styles.t} />
        </View>
      </View>
    </View>
  );
}

Header.HeaderSecond = HeaderSecond;

export { Header };