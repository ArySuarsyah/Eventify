import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Modal, Portal, Text, Button} from 'react-native-paper';

const AlertMessage = ({variant, children}) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const errorStyle = {
    backgroundColor: '#ff8787',
    padding: 20,
    height: '20%',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 20,
  };
  if (variant === 'error') {
    showModal();
  }
  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={errorStyle}>
          <Text>{children}</Text>
        </Modal>
      </Portal>
    </View>
  );
};

export default AlertMessage;
