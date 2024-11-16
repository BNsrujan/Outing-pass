import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
export default function Profile() {
    return (
        <View>
            <Link href={'../../auth/Login'} style={styles.link}>link</Link>
        </View>
    )
}


const styles = StyleSheet.create({
    link: {
        backgroundColor: "#fff"
    }
})