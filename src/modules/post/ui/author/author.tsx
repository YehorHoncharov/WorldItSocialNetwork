import React, { useState, useRef, useEffect, ElementRef } from "react";
import { View, Image, Text, TouchableOpacity, LayoutChangeEvent } from "react-native";
import Dots from "../../../../shared/ui/icons/dots";
import { styles } from "./author.styles";
import { IPost } from "../../types/post";
import { ModalPost } from "../modal-post/modal-post";
import { useUserContext } from "../../../auth/context/user-context";
import { useUserByID } from "../../hooks/use-user-by-id";

export function Author({ scrollOffset = 0, ...props }: IPost & { scrollOffset?: number }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [dotsPosition, setDotsPosition] = useState({ x: 150, y: 78 });
  const containerRef = useRef<View>(null);
  const dotsRef = useRef<ElementRef<typeof TouchableOpacity>>(null);
  const {user} = useUserByID(props.authorId)
  const [containerSize, setContainerSize] = useState({
    width: 400,
    height: 725,
  });


  const measureDots = () => {
    if (dotsRef.current) {
      dotsRef.current.measureInWindow((x, y, width, height) => {
        setDotsPosition({ x, y });
      });
    }
  };


  useEffect(() => {
    if (modalVisible) {
      measureDots();
    }
  }, [modalVisible]);


  useEffect(() => {
    if (modalVisible) {
      measureDots();
    }
  }, [scrollOffset, modalVisible]);

  const handleContainerLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setContainerSize({ width, height });
  };

  return (
    <View
      style={styles.container}
      ref={containerRef}
      onLayout={handleContainerLayout}
    >
      <View style={styles.main}>
        <View style={styles.contant}>
          <View style={{ position: "relative" }}>
            <Image
              style={{ width: 46, height: 46 }}
              source={{uri: user?.image}}
            />
            <Image
              style={{
                width: 20,
                height: 20,
                position: "absolute",
                top: 27,
                left: 27,
              }}
              source={require("../../../../shared/ui/images/avatar-indicator.png")}
            />
          </View>
          <Text>{user?.name} {user?.surname}</Text>
        </View>

        <Image
          style={{ height: 50, width: 130.83 }}
          source={require("../../../../shared/ui/images/signature.png")}
        />
      </View>
      <View>
        <TouchableOpacity
          ref={dotsRef}
          onPress={() => setModalVisible(true)}
        >
          <Dots style={{ height: 20, width: 20 }} />
        </TouchableOpacity>
      </View>
      <ModalPost
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        postId={props.id}
        dotsPosition={dotsPosition}
        containerSize={containerSize}
        scrollOffset={scrollOffset}
      />
    </View>
  );
}
