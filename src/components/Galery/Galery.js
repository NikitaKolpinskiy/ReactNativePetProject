import React, {useEffect, useState, useRef} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';

import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  Pressable,
  TouchableHighlight,
  Animated,
  Dimensions,
} from 'react-native';
import Cancel from '../../assets/svg/cancel.svg';

const styles = StyleSheet.create({
  galery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  submitWrapper: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: 150,
    bottom: 5,
  },
  submitContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    borderWidth: 4,
    width: 110,
    height: 110,
    borderColor: '#0C0C0C',
  },
  submit: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    width: 120,
    height: 120,
    borderRadius: 100,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 2,
    paddingBottom: 2,
    zIndex: 2,
  },
  selectedImageWrapper: {
    position: 'absolute',
    zIndex: 3,
    backgroundColor: 'black',
  },
});

function Galery() {
  const [hasPermission, setHasPermission] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [photos, setPhotos] = useState([]);

  const widthAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const cameraRef = useRef(null);

  const devices = useCameraDevices();

  const device = devices.back;

  const deviceWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      Animated.timing(widthAnim, {
        toValue: deviceWidth,
        duration: 500,
        useNativeDriver: false,
      }).start();

      Animated.timing(heightAnim, {
        toValue: screenHeight,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(widthAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();

      Animated.timing(heightAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedImage]);

  const handleOpenCamera = () => {
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setIsCameraOpen(false);
  };

  const handleCapture = async () => {
    const data = await cameraRef.current.takePhoto({
      enableAutoStabilization: true,
      skipMetadata: true,
      quality: 100,
    });
    const updatedPhotos = [...photos, data];
    setPhotos(updatedPhotos);
  };

  const handleOpenLargePhoto = path => {
    setSelectedImage(path);
  };

  const handleCloseLargePhoto = () => {
    setSelectedImage(null);
  };

  const selectedImageStyle = {
    width: widthAnim,
    height: heightAnim,
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: isCameraOpen ? 'space-between' : 'flex-start',
      }}>
      {device != null && isCameraOpen && hasPermission && (
        <>
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            photo={true}
          />
        </>
      )}
      {!isCameraOpen && (
        <Button
          style={{marginTop: 50}}
          title="Open Camera"
          onPress={handleOpenCamera}
        />
      )}
      {isCameraOpen && (
        <Pressable
          style={{alignItems: 'flex-end', marginTop: 10}}
          onPress={() => handleCloseCamera()}>
          <Cancel width={50} height={50} fill="#757575" />
        </Pressable>
      )}
      {isCameraOpen && (
        <View style={styles.submitWrapper}>
          <TouchableHighlight style={styles.submit} onPress={handleCapture}>
            <View style={styles.submitContainer} />
          </TouchableHighlight>
        </View>
      )}
      {isCameraOpen && photos.length ? (
        <Pressable
          style={{alignItems: 'flex-start', marginTop: 10}}
          onPress={() => handleOpenLargePhoto(photos[photos.length - 1]?.path)}>
          <Image
            source={{uri: `file://${photos[photos.length - 1]?.path}`}}
            style={{
              width: 120,
              height: 120,
              marginTop: 5,
              marginLeft: 5,
              marginRight: 5,
              marginBottom: 5,
            }}
          />
        </Pressable>
      ) : (
        <SafeAreaView style={styles.galery}>
          {photos.length
            ? photos.map(photo => {
                return (
                  <Pressable
                    key={photo.path}
                    style={{alignItems: 'flex-end', marginTop: 10}}
                    onPress={() => handleOpenLargePhoto(photo?.path)}>
                    <Image
                      source={{uri: `file://${photo.path}`}}
                      style={{
                        width: 120,
                        height: 120,
                        marginTop: 5,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 5,
                      }}
                    />
                  </Pressable>
                );
              })
            : null}
        </SafeAreaView>
      )}
      {selectedImage && (
        <Animated.View
          style={[styles.selectedImageWrapper, selectedImageStyle]}>
          <Pressable
            style={{alignItems: 'flex-end', marginTop: 10, right: 0, zIndex: 4}}
            onPress={handleCloseLargePhoto}>
            <Cancel width={50} height={50} fill="white" />
          </Pressable>
          <Animated.Image
            style={{
              width: widthAnim,
              height: screenHeight,
              position: 'absolute',
            }}
            source={{uri: `file://${selectedImage}`}}
          />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

export default Galery;
