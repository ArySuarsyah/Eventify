import {View, Text, Image} from 'react-native';
import React from 'react';
import globalStyle from '../../assets/globalStyles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import FontAwesome6 from 'react-native-vector-icons/dist/FontAwesome6';

import retail from '../../assets/Image/market.png';

import {List} from 'react-native-paper';

export default function Payment() {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const market = Image.resolveAssetSource(retail).uri;

  return (
    <View>
      <View style={globalStyle.bookingHeader}>
        <AntDesign name="arrowleft" size={30} color="#02A8A8" />
        <Text style={globalStyle.textHeader}>Payment</Text>
      </View>
      <View>
        <Text>Payment Method</Text>
        <List.Section title="Accordions">
          <List.Accordion
            title="Uncontrolled Accordion"
            left={props => (
              <Ionicons name="card-sharp" size={30} color="#02A8A8" />
            )}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>

          <List.Accordion
            title="Controlled Accordion"
            left={props => (
              <FontAwesome name="bank" size={30} color="#02A8A8" />
            )}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
          <List.Accordion
            title="Controlled Accordion"
            left={props => (
              <FontAwesome name="bank" size={30} color="#02A8A8" />
            )}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
          <List.Accordion
            title="Controlled Accordion"
            left={props => (
              <FontAwesome name="bank" size={30} color="#02A8A8" />
            )}
            expanded={expanded}
            onPress={handlePress}>
            <List.Item title="First item" />
            <List.Item title="Second item" />
          </List.Accordion>
        </List.Section>
      </View>
    </View>
  );
}
