import React, { useRef, useState } from "react";
import { Animated, Dimensions, FlatList } from "react-native";

import WalletCard from "./WalletCard";


const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const useLazyRef = (initializer) => {
  const ref = useRef();
  if (ref.current === undefined) {
    ref.current = initializer();
  }
  return ref.current;
};
const { height, width } = Dimensions.get("window");
const ratio = 228 / 362;
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = CARD_WIDTH * ratio;
const MARGIN = 16;
const HEIGHT = CARD_HEIGHT + MARGIN * 2;

const cards = [
  {
    index: 1,
    type: "cardType1",
  },
  {
    index: 2,
    type: "cardType2",
  },
  {
    index: 3,
    type: "cardType3",
  },
  {
    index: 4,
    type: "cardType4",
  },
  {
    index: 5,
    type: "cardType5",
  },
  {
    index: 7,
    type: "cardType6",
  },
];

const Wallet = () => {
  const y = useLazyRef(() => new Animated.Value(0));
  const onScroll = useLazyRef(() =>
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: { y },
          },
        },
      ],
      { useNativeDriver: true }
    )
  );
  return (
    <AnimatedFlatList
      scrollEventThrottle={16}
      bounces={false}
      {...{ onScroll }}
      data={cards}
      renderItem={({ index, item: { type } }) => (
        <WalletCard {...{ index, y, type }} />
      )}
      keyExtractor={(item) => `${item.index}`}
    />
  );
};

export default Wallet;