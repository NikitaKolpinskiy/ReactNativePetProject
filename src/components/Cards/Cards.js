import React from 'react';
import BurgerMenu from "../BurgerMenu";

import Wallet from "../Wallet";

import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    ScrollView,
    FlatList,
} from "react-native";

const Cards = () => {
    return (
        <View>
            <BurgerMenu />
            <Wallet />
        </View>
    );
};

export default Cards;