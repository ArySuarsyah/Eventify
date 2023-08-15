/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from 'react-native';
import {Button, List, TouchableRipple, Modal, Portal} from 'react-native-paper';
import globalStyle from '../../assets/globalStyles';
import React from 'react';
import userImage from '../../assets/Image/userDefault.png';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import RadioGroup from 'react-native-radio-buttons-group';
import {useSelector} from 'react-redux';
import http from '../../helper/http';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function EditProfile() {
  const token = useSelector(state => state.auth.token);
  const USER_DEFAULT_IMAGE = Image.resolveAssetSource(userImage).uri;
  const [user, setUser] = React.useState([]);
  const [editFullname, setEditFullname] = React.useState(false);
  const [editUserName, setEditUserName] = React.useState(false);
  const [editEmail, setEdirEmail] = React.useState(false);
  const [editPhone, setEditPhone] = React.useState(false);
  const [editGender, setEditGender] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState('');
  const [professionId, setProfessionId] = React.useState('');
  const [selectCountries, setSelectCountries] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [emailUser, setEmailUser] = React.useState('');
  const [userPhone, setUserPhone] = React.useState('');
  const [dataDate, setDataDate] = React.useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [success, setSuccess] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState('');

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getUser = React.useCallback(async () => {
    const {data} = await http(token).get('/profile');
    setUser(data.results);
  }, [token]);

  React.useEffect(() => {
    getUser();
  }, [getUser]);

  // const handlePress = () => setExpanded(!expanded);
  const handleEditName = () => {
    setEditFullname(!editFullname);
  };
  const handleEditUserNamae = () => {
    setEditUserName(!editUserName);
  };
  const handleEditEmail = () => {
    setEdirEmail(!editEmail);
  };
  const handleEditPhone = () => {
    setEditPhone(!editPhone);
  };
  const handleEditGender = () => {
    setEditGender(!editGender);
  };

  const openGalerry = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const openCamera = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  const radioButtons = React.useMemo(
    () => [
      {
        id: 'Male',
        label: 'Male',
      },
      {
        id: 'Female',
        label: 'Female',
      },
    ],
    [],
  );

  const profession = React.useMemo(
    () => [
      {
        id: 'Programmer',
        label: 'Programmer',
      },
      {
        id: 'Designer',
        label: 'Designer',
      },
      {
        id: 'Engineer',
        label: 'Engineer',
      },
      {
        id: 'Teacher',
        label: 'Teacher',
      },
      {
        id: 'Doctor',
        label: 'Doctor',
      },
      {
        id: 'Writer',
        label: 'Writer',
      },
      {
        id: 'Artist',
        label: 'Artist',
      },
      {
        id: 'Chef',
        label: 'Chef',
      },
      {
        id: 'Photographer',
        label: 'Photographer',
      },
      {
        id: 'Musician',
        label: 'Musician',
      },
    ],
    [],
  );

  const countries = React.useMemo(
    () => [
      {
        id: 'United States',
        label: 'United States',
      },
      {
        id: 'Canada',
        label: 'Canada',
      },
      {
        id: 'United Kingdom',
        label: 'United Kingdom',
      },
      {
        id: 'Australia',
        label: 'Australia',
      },
      {
        id: 'Germany',
        label: 'Germany',
      },
      {
        id: 'France',
        label: 'France',
      },
      {
        id: 'Japan',
        label: 'Japan',
      },
      {
        id: 'Brazil',
        label: 'Brazil',
      },
      {
        id: 'India',
        label: 'India',
      },
      {
        id: 'China',
        label: 'China',
      },
    ],
    [],
  );

  const onChangeFullname = text => {
    setFullName(text);
  };

  const onChangeUsername = text => {
    setUsername(text);
  };

  const onChangeEmail = text => {
    setEmailUser(text);
  };

  const onChangePhone = text => {
    setUserPhone(text);
  };

  const handleButtonSave = async () => {
    try {
      const picture = {
        uri: selectedImage,
        type: 'image/jpeg',
        name: 'image' + '-' + Date.now() + '.jpg',
      };
      const gender = selectedId === 'Male' ? true : false;
      const form = new FormData();
      form.append('picture', picture);
      form.append('fullName', fullName);
      form.append('userName', username);
      form.append('email', emailUser);
      form.append('phoneNumber', userPhone);
      form.append('gender', gender);
      form.append('profession', professionId);
      form.append('nationality', selectCountries);
      form.append('birthdate', moment(dataDate).format('YYYYMMDD'));
      console.log(form);
      const {data} = await http(token).post('/profile', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (data.success) {
        setMessage('Edit Profile Success');
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(true);
      setMessage(error.message);
      console.log(error);
    }
  };

  const handleConfirm = () => {
    setRefreshing(true);
    setSuccess(false);
    if (user) {
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
      setEditFullname(false);
      setEditUserName(false);
      setEdirEmail(false);
      setEditPhone(false);
    }
  };

  // const onRefresh = React.useCallback(() => {
  //   setTimeout(() => {
  //     setRefreshing(false);
  //   }, 2000);
  // }, []);

  // console.log(user);

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} />}>
      <View style={styles.container}>
        <View style={success ? styles.alertContainer : styles.hidden}>
          <View style={styles.alertParent}>
            {message === 'Edit Profile Success' ? (
              <MaterialIcons name="check" size={50} color="#018383" />
            ) : (
              <MaterialIcons name="close" size={50} color="#ff6b6b" />
            )}
            <Text style={styles.titleStyle}>{message}</Text>
            <Button
              mode="elevated"
              theme={{colors: {primary: '#018383'}}}
              onPress={handleConfirm}
              style={styles.sendDataButton}>
              Ok
            </Button>
          </View>
        </View>
        <View style={globalStyle.bookingHeader}>
          <AntDesign name="arrowleft" size={30} color="#02A8A8" />
          <Text style={globalStyle.textHeader}>Edit Profile</Text>
        </View>
        <View style={styles.main}>
          <Portal>
            <Modal
              contentContainerStyle={{
                backgroundColor: 'white',
                width: '80%',
              }}
              style={{alignItems: 'center'}}
              visible={visible}
              onDismiss={hideModal}>
              <TouchableRipple onPress={openGalerry}>
                <View style={styles.imagePicker}>
                  <Text style={styles.imagePickText}>Choose From Galery</Text>
                  <FeatherIcon name="upload" size={20} color="#02A8A8" />
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={openCamera}>
                <View style={styles.imagePicker}>
                  <Text style={styles.imagePickText}>Choose From Camera</Text>
                  <FeatherIcon name="camera" size={20} color="#02A8A8" />
                </View>
              </TouchableRipple>
              <View style={styles.confirmParent}>
                <TouchableRipple style={styles.confirm} onPress={hideModal}>
                  <Text style={{color: 'white'}}>OK</Text>
                </TouchableRipple>
              </View>
            </Modal>
          </Portal>
          <TouchableOpacity onPress={showModal}>
            <View style={globalStyle.userImage}>
              <View style={styles.ImageParent}>
                <View style={{position: 'absolute', zIndex: 1}}>
                  <FeatherIcon name="camera" size={30} color="#fff" />
                </View>
                <LinearGradient
                  colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.55)']}
                  style={globalStyle.bgGradient}
                />
                {/* {user?.pictuer && (
                  <Image
                    source={{
                      uri: USER_DEFAULT_IMAGE,
                    }}
                    width={100}
                    height={100}
                  />
                )} */}

                <Image
                  source={{
                    uri: user.picture
                      ? `https://res.cloudinary.com/arsrsyh/image/upload/v1692086351/${user.picture}`
                      : USER_DEFAULT_IMAGE,
                  }}
                  width={100}
                  height={100}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={styles.profileDataContainer}>
            <View style={styles.profileData}>
              {editFullname && (
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeFullname}
                  placeholder="fullname"
                  keyboardType="default"
                />
              )}
              {!editFullname && (
                <Text style={styles.titleStyle}>{user.fullName}</Text>
              )}
              <TouchableOpacity onPress={handleEditName}>
                <Text>{editFullname ? 'Close' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileData}>
              {editUserName && (
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeUsername}
                  placeholder="username"
                  keyboardType="default"
                />
              )}
              {!editUserName && (
                <Text style={styles.titleStyle}>
                  {user?.userName ? user.userName : 'add username'}
                </Text>
              )}
              <TouchableOpacity onPress={handleEditUserNamae}>
                <Text>{editUserName ? 'Close' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileData}>
              {editEmail && (
                <TextInput
                  style={styles.input}
                  onChangeText={onChangeEmail}
                  placeholder="email"
                  keyboardType="email-address"
                />
              )}
              {!editEmail && (
                <Text style={styles.titleStyle}>
                  {user?.email ? user.email : 'add email'}
                </Text>
              )}
              <TouchableOpacity onPress={handleEditEmail}>
                <Text>{editEmail ? 'Close' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileData}>
              {editPhone && (
                <TextInput
                  style={styles.input}
                  onChangeText={onChangePhone}
                  placeholder="phone number"
                  keyboardType="phone-pad"
                />
              )}
              {!editPhone && (
                <Text style={styles.titleStyle}>
                  {user?.phoneNumber ? user.phoneNumber : 'add phone number'}
                </Text>
              )}
              <TouchableOpacity onPress={handleEditPhone}>
                <Text>{editPhone ? 'Close' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.profileData, styles.flexDirectionColumn]}>
              <Text>Gender</Text>
              <View style={styles.editGenderParent}>
                {editGender && (
                  <RadioGroup
                    radioButtons={radioButtons}
                    onPress={setSelectedId}
                    selectedId={selectedId}
                    containerStyle={styles.radioDirection}
                  />
                )}
                {!editGender && (
                  <Text style={styles.titleStyle}>
                    {user?.gender ? user.gender : 'add gender'}
                  </Text>
                )}
                <TouchableOpacity onPress={handleEditGender}>
                  <Text>{editGender ? 'Close' : 'Edit'}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.accordion}>
              <List.Section
                title="Profession"
                titleStyle={styles.titleStyle}
                style={styles.listAccordionStyle}>
                <List.Accordion
                  title="Select Profession"
                  style={styles.accordionBg}>
                  <TouchableRipple
                  // onPress={() => handleClickProfession(item.title)}
                  >
                    <RadioGroup
                      radioButtons={profession}
                      onPress={setProfessionId}
                      selectedId={professionId}
                      containerStyle={styles.radioProfession}
                    />
                  </TouchableRipple>
                </List.Accordion>
              </List.Section>
            </View>
            <View style={styles.accordion}>
              <List.Section
                title="Nationality"
                style={styles.listAccordionStyle}
                titleStyle={styles.titleStyle}>
                <List.Accordion
                  title="Select Nationality"
                  style={styles.accordionBg}>
                  <TouchableRipple>
                    <RadioGroup
                      radioButtons={countries}
                      onPress={setSelectCountries}
                      selectedId={selectCountries}
                      containerStyle={styles.radioProfession}
                      radioButtonStyle={styles.radioValue}
                    />
                  </TouchableRipple>
                </List.Accordion>
              </List.Section>
            </View>
            <View style={[styles.profileData, styles.flexDirectionColumn]}>
              <Text>Birthdate</Text>
              <View style={styles.birthdateParent}>
                {open && (
                  <>
                    <DatePicker
                      modal
                      mode="date"
                      open={open}
                      date={dataDate}
                      onConfirm={date => {
                        setDataDate(date);
                      }}
                      onCancel={() => {
                        setOpen(false);
                      }}
                    />
                    <Text>{moment(dataDate).format('YYYY-MMM-DD')}</Text>
                  </>
                )}
                {!open && (
                  <Text style={styles.titleStyle}>
                    {user?.birthdate
                      ? moment(user.birthdate).format('YYYY-MM-DD')
                      : 'Add birthdate'}
                  </Text>
                )}
                <TouchableOpacity onPress={() => setOpen(!open)}>
                  <Text>{open ? 'Close' : 'Edit'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <Button
          mode="contained"
          theme={{colors: {primary: '#018383'}}}
          onPress={handleButtonSave}
          style={styles.sendDataButton}>
          Save
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
  },
  main: {alignItems: 'center', padding: 10},
  input: {
    color: 'black',
    padding: 10,
    height: 60,
    width: 290,
    borderWidth: 1,
    borderColor: '#02A8A8',
    borderRadius: 12,
  },
  profileData: {
    height: 80,
    padding: 20,
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  editGenderParent: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  accordion: {
    width: '100%',
  },
  titleStyle: {
    fontSize: 20,
  },
  accordionBg: {
    backgroundColor: 'white',
  },
  ImageParent: {
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDataContainer: {width: '100%', alignItems: 'flex-start'},
  radioDirection: {flexDirection: 'row'},
  listAccordionStyle: {width: '100%', backgroundColor: 'white'},
  selectProfession: {
    backgroundColor: 'black',
    width: 15,
    height: 15,
    borderRadius: 15,
  },
  radioPoint: {
    width: 20,
    height: 20,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioProfession: {
    alignItems: 'start',
    fontSize: 32,
  },
  sendDataButton: {
    height: 50,
    justifyContent: 'center',
    // alignItems: 'center',
    margin: 20,
  },
  radioValue: {
    width: 10,
  },
  birthdateParent: {flexDirection: 'row', gap: 10, alignItems: 'center'},
  alertContainer: {
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('screen').width,
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertParent: {
    height: '20%',
    width: '70%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  hidden: {
    display: 'none',
  },
  imagePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  imagePickText: {
    color: 'black',
    fontSize: 15,
  },
  confirm: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#02A8A8',
  },
  confirmParent: {
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
