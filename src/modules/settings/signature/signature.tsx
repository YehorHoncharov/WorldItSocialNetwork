import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import SignatureScreen, { SignatureViewRef } from "react-native-signature-canvas";
import { styles } from "./singnature.styles";

export interface SignaturePadRef {
    clearSignature: () => void;
    saveSignature: () => void;
}

interface SignaturePadProps {
    onSave?: (signature: string) => void;
    onDrawingStart?: () => void;
    onDrawingEnd?: () => void;
}

export const SignaturePad = forwardRef<SignaturePadRef, SignaturePadProps>(
    ({ onSave, onDrawingStart, onDrawingEnd }, ref) => {
        const signatureRef = useRef<SignatureViewRef>(null);
        const [signature, setSignature] = React.useState<string | null>(null);

        useImperativeHandle(ref, () => ({
            clearSignature: () => {
                signatureRef.current?.clearSignature();
                setSignature(null);
            },
            saveSignature: () => {
                signatureRef.current?.readSignature();
            },
        }));

        const handleOK = (signatureResult: string) => {
            setSignature(signatureResult);
            onSave?.(signatureResult);
        };

        const webStyle = `
      .m-signature-pad {
        box-shadow: none;
        border: none;
        background: #FFF;
        height: 100%;
        width: 100%;
      }
      .m-signature-pad--body {
        border: none;
      }
      body, html {
        height: 100%;
        width: 100%;
        overflow: hidden;
      }
      .m-signature-pad--footer {
        display: none;
      }
    `;

        return (
            <View>
                <View
                    style={{ height: 200, borderWidth: 1, borderColor: "#CDCED2", borderRadius: 5 }}
                >
                    <SignatureScreen
                        ref={signatureRef}
                        onOK={handleOK}
                        onBegin={onDrawingStart}
                        onEnd={onDrawingEnd}
                        webStyle={webStyle}
                        autoClear={false}
                        descriptionText=""
                        scrollable={false}
                    />
                </View>

                <View
                    style={{ flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}
                >
                    <TouchableOpacity
                        onPress={() => signatureRef.current?.clearSignature()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Очистити</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => signatureRef.current?.readSignature()}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Зберегти</Text>
                    </TouchableOpacity>
                </View>

                {signature && (
                    <Image
                        source={{ uri: signature }}
                        style={{ width: "100%", height: 100, marginTop: 10 }}
                        resizeMode="contain"
                    />
                )}
            </View>
        );
    },
);
SignaturePad.displayName = "SignaturePad";
