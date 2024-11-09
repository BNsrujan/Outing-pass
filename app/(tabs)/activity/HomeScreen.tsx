import { View, Text } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const HomeScreen = () => {
    const user = {
        name: "Srujan BN",
        email: "srujan123@gmail.com",
        phone: "9876543210",
        usn: "4al22cs164",
        branch: "CSE",
        sem: "6",
        college: "Alvas Institute of Engineering and Technology",
    };

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
            <QRCode
                value={JSON.stringify(user)}
                size={200}
                ecl="H"
            />
        </View>
    );
};

export default HomeScreen;
