import React from "react";
import { Dimensions, Image, StyleSheet } from "react-native";

import card1 from "../../assets/images/card1.png";
import card2 from "../../assets/images/card2.png";
import card3 from "../../assets/images/card3.png";
import card4 from "../../assets/images/card4.png";
import card5 from "../../assets/images/card5.png";
import card6 from "../../assets/images/card6.png";


const { width } = Dimensions.get("window");
const ratio = 228 / 362;

export const CARD_WIDTH = width * 0.8;
export const CARD_HEIGHT = CARD_WIDTH * ratio;

const CardsConfig = {
    cardType1: card1,
    cardType2: card2,
    cardType3: card3,
    cardType4: card4,
    cardType5: card5,
    cardType6: card6,
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
});

const Card =  ({ type }) => {
  const image = CardsConfig[type];

  return <Image style={styles.card} source={image} />;
};

export default Card;