import { Stack } from "expo-router"

const Stacklayout = () => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{
                title: "Home",
                headerShown: false,
            }} />
        </Stack>
    )
}


export default Stacklayout;