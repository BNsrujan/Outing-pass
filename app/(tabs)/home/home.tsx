import { View } from 'react-native';
import CustomButton from '@/components/ui/CustomButton';
import { router } from 'expo-router';

export default function Index() {
  const handlePress = () => {
    router.push('/(tabs)/activity');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomButton title="Request" onPress={handlePress} />

    </View>
  );
}

