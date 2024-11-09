import { Stack } from "expo-router"

const Stacklayout = () => {
    return (
        <Stack>
            <Stack.Screen name="home" options={{
                title: "Home",
                headerShown: false,
            }} />
        </Stack>
    )
}


export default Stacklayout;