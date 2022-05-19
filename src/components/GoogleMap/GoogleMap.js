import React, { useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { View, Button } from "react-native";

const GoogleMap = () => {
    const [currentCoordinated, setcurrentCoordinated] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    })

    const handleCoordinated = () => {
        setcurrentCoordinated({
            latitude: 54,
            longitude: 32,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        })
    };
    return (
        <View style={{flex: 1}}>
            <MapView
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                region={currentCoordinated}
                style={{ flex: 1 }}
            />
            <Button title="Change coordinated" onPress={handleCoordinated} style={{ position: "absolute", zIndex:2  }} />
        </View>
    );
};

export default GoogleMap;