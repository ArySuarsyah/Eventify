import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import {useNavigation, useRoute} from '@react-navigation/native';
// import {useDispatch} from 'react-redux';
// import {getRoutes} from '../redux/reducers/routesName';
// import {useSelector} from 'react-redux';

const Headers = ({navigation}) => {
  const state = navigation.getState();
  const onScreen = state.history[state.history.length - 1];
  const onScreenName = state?.routes.filter(o => o.key === onScreen.key);

  // if (!!onScreenName.length) {
  //   if (onScreenName[0].state) {
  //     dispatch(
  //       getRoutes(
  //         onScreenName[0].state.routes[onScreenName[0].state.index].name,
  //       ),
  //     );
  //   } else {
  //     dispatch(getRoutes(onScreenName[0].name));
  //   }
  // }

  return (
    <View style={styles.headerContainer}>
      <View>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FeatherIcon name="menu" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.headerTitle}>
        {!!onScreenName.length &&
          (onScreenName[0].state ? (
            <Text style={styles.headerName}>
              {onScreenName[0].state.routes[onScreenName[0].state.index]
                .name === 'HomeStack'
                ? 'Home'
                : onScreenName[0].state.routes[onScreenName[0].state.index]
                    .name}
            </Text>
          ) : (
            <Text style={styles.headerName}>{onScreenName[0].name}</Text>
          ))}
      </View>
      <View />
    </View>
  );
};

export default Headers;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerName: {
    fontSize: 20,
  },
});
