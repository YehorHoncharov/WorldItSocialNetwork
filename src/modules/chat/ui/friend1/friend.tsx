import { View, Image, Text } from 'react-native';
import { styles } from './friend.styles';
import { IUser } from '../../../auth/types';
import { API_BASE_URL } from '../../../../settings';

export function Friend1({ user }: { user: IUser }) {

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: API_BASE_URL + "/" + user?.image || '../../../../shared/ui/images/user.png' }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.name || 'Anonymous'}</Text>
      <Text style={styles.name}>{user?.surname || 'Anonymous'}</Text>
    </View>
  );
}