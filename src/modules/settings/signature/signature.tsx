// // import { useRef, useState } from "react";
// // import SignaturePad from "react-signature-canvas";
// // import SignatureCanvas from "react-signature-canvas";
// // import { View , Image, TouchableOpacity} from "react-native";
// // import { styles } from "./singnature.styles";

// // export default function SignatureScreen() {
// //   const [dataURL, setDataURL] = useState<string | null>(null);

// //   let padRef = useRef<SignatureCanvas>(null);

// //   function clear(){
// //     padRef.current?.clear();
// //   };

// //   function trim() {
// //     const url = padRef.current?.getTrimmedCanvas().toDataURL("image/png");
// //     if (url) setDataURL(url);
// //   };

// //   return (
// //     <View>
// //       <SignaturePad ref={padRef} canvasProps={{ className: "sigCanvas" }} />
// //       <View style={styles.sigImage}>
// //         <TouchableOpacity onPress={trim}>Trim</TouchableOpacity>
// //         <TouchableOpacity onPress={clear}>Clear</TouchableOpacity>
// //         {dataURL ? (
// //           <Image
// //             style={styles.sigImage}
// //             source={{ uri: dataURL }}
// //           />
// //         ) : null}
// //       </View>
// //     </View>
// //   );
// // }
// import React, { useRef, useState } from "react";
// import SignatureScreen from "react-native-signature-canvas";
// import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     width: "auto",
//     height: 400,
//     backgroundColor: "#FAF8",
//     borderWidth: 1,
//     borderColor: "bLack",
//     borderRadius: 10,
//   },
//   sigImage: {
//     width: "100%",
//     height: 200,
//     marginTop: 10,
//   },
//   buttonContainer: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     marginTop: 10,
//   },
// });

// interface SignatureScreenProps {
//     onBegin?: () => void;
//     onEnd?: () => void;
//     webStyle?: string;
// }

// export default function SignatureComponent({onBegin, onEnd, webStyle}: SignatureScreenProps) {
//   const [signature, setSignature] = useState<string | null>(null);
//   const signatureRef = useRef<any>(null);

//   const handleClear = () => {
//     signatureRef.current?.clearSignature();
//   };

//   const handleConfirm = (signatureResult: string) => {
//     setSignature(signatureResult);
//   };

//   const handleTrim = () => {
//     signatureRef.current?.readSignature();
//   };

//   const style = `.m-signature-pad {box-shadow: none; border: none; background-color: white;} 
//                 .m-signature-pad--body {border: none;}
//                 .m-signature-pad--footer {display: none; margin: 0px;}`;

//   return (
//     <View style={styles.container}>
//       <SignatureScreen
//         ref={signatureRef}
//         onOK={handleConfirm}
//         webStyle={style}
//         autoClear={false}
//         descriptionText="Sign here"
//       />
      
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity onPress={handleTrim}>
//           <Text>Trim</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={handleClear}>
//           <Text>Clear</Text>
//         </TouchableOpacity>
//       </View>

//       {signature && (
//         <Image
//           style={styles.sigImage}
//           resizeMode={"contain"}
//           source={{ uri: signature }}
//         />
//       )}
//     </View>
//   );
// }

import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import SignatureScreen, { SignatureViewRef } from 'react-native-signature-canvas';
import { styles } from './singnature.styles';

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
      }
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
        <View style={{ height: 200, borderWidth: 1, borderColor: '#CDCED2', borderRadius: 5 }}>
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
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
            style={{ width: '100%', height: 100, marginTop: 10 }}
            resizeMode="contain"
          />
        )}
      </View>
    );
  }
);