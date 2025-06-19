import { View, Image, Text } from 'react-native';
import { styles } from './friend.styles';

export function Friend1({ user }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: user?.image || '../../../../shared/ui/images/user.png' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.name || 'Anonymous' }</Text>
      <Text style={styles.name}>{ user?.surname || 'Anonymous'}</Text>
    </View>
  );
}