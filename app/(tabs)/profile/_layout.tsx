import { Stack } from "expo-router";

export default function Profile() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Profile",
                headerShown: false,
            }} />
        </Stack>
    )
} 