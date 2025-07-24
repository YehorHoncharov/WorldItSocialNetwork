

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useForm } from "react-hook-form";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./reg-form-three.styles";
import { IRegCode } from "./reg-form-three.types";
import { useUserContext } from "../../context/user-context";
import {
    CodeField,
    useBlurOnFulfill,
    useClearByFocusCell,
} from "react-native-confirmation-code-field";
import RegStepTwoModal from "../../../../app/(auth)/registration/step-two";

const CELL_COUNT = 6;

export function RegFormThree() {
    const { handleSubmit } = useForm<IRegCode>();
    const router = useRouter();
    const { setShowWelcomeModal, showWelcomeModal } = useUserContext();
    const params = useLocalSearchParams<{
        email: string;
        password: string;
    }>();

    const [code, setCode] = useState("");

    const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value: code,
        setValue: setCode,
    });

    function onBack() {
        router.back();
    }

    function onSubmit() {
        if (code) {
            router.navigate({
                pathname: "/registration/step-three",
                params: { code, ...params },
            });
            setShowWelcomeModal(true);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <View
                    style={{
                        gap: 36,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text style={styles.signUp}>Підтвердження пошти</Text>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontWeight: "500", textAlign: "center" }}>
                            Ми надіслали 6-значний код на вашу пошту{" "}
                            <Text style={{ fontWeight: "700" }}>({params.email})</Text>. Введіть його нижче, щоб підтвердити акаунт
                        </Text>
                    </View>
                </View>

                <View style={{ marginTop: 24 }}>
                    <Text style={{ fontWeight: 400, marginBottom: 8 }}>
                        Код підтвердження
                    </Text>
                    <CodeField
                        ref={ref}
                        {...props}
                        value={code}
                        onChangeText={setCode}
                        cellCount={CELL_COUNT}
                        rootStyle={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignSelf: "center",
                            width: 280,
                        }}
                        renderCell={({ index, symbol, isFocused }) => (
                            <View
                                key={index}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: isFocused ? "#543C52" : "#CDCED2",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#FFFFFF",
                                }}
                                onLayout={getCellOnLayoutHandler(index)}
                            >
                                <Text style={{ fontSize: 16, color: "#81818D" }}>
                                    {symbol || (isFocused ? "|" : "_")}
                                </Text>
                            </View>
                        )}
                    />
                </View>

                <View style={{ gap: 16, alignItems: "center" }}>
                    <Button onPress={handleSubmit(onSubmit)} label="Підтвердити" />
                    <TouchableOpacity onPress={onBack}>
                        <Text style={{ fontWeight: "500", color: "#543C52" }}>
                            Назад
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <RegStepTwoModal
                modalVisible={showWelcomeModal}
                changeVisibility={() => setShowWelcomeModal(false)}
            />
        </>
    );
}