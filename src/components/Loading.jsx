import * as React from 'react';
import {View} from 'react-native';
import {Modal, Portal, ActivityIndicator} from 'react-native-paper';
// import { Text, Button} from 'react-native-paper';

export default function Loading({showHide}) {
  const [visible, setVisible] = React.useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  showHide ? showModal() : hideModal();

  return (
    <View>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal}>
          <ActivityIndicator type="large" animating={true} color="#F5DEA3" />
        </Modal>
      </Portal>
    </View>
  );
}
