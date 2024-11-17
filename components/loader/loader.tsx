import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingKit from 'react-native-loader-kit'

export default function Loader() {
    return (
        <LinearGradient
            colors={["E5ECF9", "#F6F7f9"]}
            style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
        >
            <LoadingKit
                style={{ width: 250, height: 250 }}
                name={'BallSpinFadeLoader'}
                color={'white'}
            />
        </LinearGradient>
    )
}