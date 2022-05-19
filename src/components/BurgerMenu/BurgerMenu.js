import React, { useRef, useEffect, useState } from 'react';

import {
    SafeAreaView,
    Text,
    StyleSheet,
    View,
    Image,
    Animated,
    Button,
    Pressable,
    Dimensions,
} from "react-native";
import menu from "../../assets/images/menu.png";

const styles = StyleSheet.create({
    fadingContainer: {
      position: "absolute",
      flexDirection: "row",
      alignItems: "center",
      left: 0,
      zIndex: 2,
    },
    menuList: {
        paddingTop: 20,
        alignItems: "center",
        height: "100%",
        backgroundColor: "white",
        width: "30%",
    },
  });
  

const BurgerMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const widthAnim = useRef(new Animated.Value(0)).current;
    const textAnim = useRef(new Animated.Value(0)).current;
    const deviceWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    
    const openMenu = () => {
        // Will change fadeAnim value to 1 in 1.5 seconds
        Animated.timing(widthAnim, {
          toValue: deviceWidth,
          duration: 500,
          useNativeDriver:false
        }).start();
        setIsMenuOpen(true);
      };
    
    const closeMenu = () => {
      // Will change fadeAnim value to 0 in 1.5 seconds
      Animated.timing(widthAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver:false
      }).start();
      setIsMenuOpen(false);
    };
    
    const widthStyle = {
        width: widthAnim,
    };

    return (
        <SafeAreaView>
            <Pressable style={{ paddingTop: 20, paddingLeft: 20, }} onPress={openMenu}>
                <Image
                  source={menu}
                />
            </Pressable>
            <Animated.View
              style={[
                styles.fadingContainer,
                widthStyle,
                {
                    height: screenHeight,
                }
              ]}
            >
                <View style={styles.menuList}>
                    <Text style={{ fontSize: isMenuOpen ? 16 : 0 }}>First Item</Text>
                    <Text style={{ fontSize: isMenuOpen ? 16 : 0 }}>Second Item</Text>
                    <Text style={{ fontSize: isMenuOpen ? 16 : 0 }}>Third Item</Text>
                </View>
                    <Pressable onPress={closeMenu} style={{ width: "100%" }}>
                        <View style={{
                            height: screenHeight,
                            backgroundColor: "rgba(52, 52, 52, 0.8)",
                        }}></View>
                    </Pressable>
            </Animated.View>
        </SafeAreaView>
    );
};

export default BurgerMenu;