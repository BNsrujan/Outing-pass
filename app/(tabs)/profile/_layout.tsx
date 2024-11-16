import { Stack } from "expo-router";

export default function Profile() {
    return (
        <Stack>
            <Stack.Screen name="profile" options={{
                title: "Profile",
                headerShown: false,
            }} />
        </Stack>
    )
} 