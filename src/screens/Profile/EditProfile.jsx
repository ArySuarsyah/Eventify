import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {List} from 'react-native-paper';
import globalStyle from '../../assets/globalStyles';
import React from 'react';
import userImage from '../../assets/Image/userDefault.png';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import RadioGroup from 'react-native-radio-buttons-group';

export default function EditProfile() {
  const [expanded, setExpanded] = React.useState(true);
  const USER_DEFAULT_IMAGE = Image.resolveAssetSource(userImage).uri;

  const [value, setValue] = React.useState('first');
  const [editFullname, setEditFullname] = React.useState(false);
  const [editUserName, setEditUserName] = React.useState(false);
  const [editEmail, setEdirEmail] = React.useState(false);
  const [editPhone, setEditPhone] = React.useState(false);
  const [editGender, setEditGender] = React.useState(false);
  const [editProfession, setEditProfession] = React.useState(false);
  const [editNationality, setEditNationality] = React.useState(false);

  const [selectedId, setSelectedId] = React.useState();

  const handlePress = () => setExpanded(!expanded);
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
  const handleEditProfession = () => {
    setEditProfession(!editProfession);
  };
  const handleEditNationality = () => {
    setEditNationality(!editNationality);
  };
  const radioButtons = React.useMemo(
    () => [
      {
        id: '1', // acts as primary key, should be unique and non-empty string
        label: 'Male',
        value: 'Male',
      },
      {
        id: '2',
        label: 'Female',
        value: 'Female',
      },
    ],
    [],
  );

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={globalStyle.bookingHeader}>
          <AntDesign name="arrowleft" size={30} color="#02A8A8" />
          <Text style={globalStyle.textHeader}>Edit Profile</Text>
        </View>
        <View style={styles.main}>
          <View style={globalStyle.userImage}>
            <View style={styles.ImageParent}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.55)']}
                style={globalStyle.bgGradient}
              />
              <Image
                source={{
                  uri: USER_DEFAULT_IMAGE,
                }}
                width={80}
                height={80}
              />
            </View>
          </View>
          <View style={styles.profileDataContainer}>
            <View style={styles.profileData}>
              {editFullname && (
                <TextInput
                  style={styles.input}
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              )}
              {!editFullname && <Text style={styles.profileValue}>Name</Text>}
              <TouchableOpacity onPress={handleEditName}>
                <Text>{editFullname ? 'Close' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileData}>
              {editUserName && (
                <TextInput
                  style={styles.input}
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              )}
              {!editUserName && (
                <Text style={styles.profileValue}>UserName</Text>
              )}
              <TouchableOpacity onPress={handleEditUserNamae}>
                <Text>edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileData}>
              {editEmail && (
                <TextInput
                  style={styles.input}
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              )}
              {!editEmail && <Text style={styles.profileValue}>Email</Text>}
              <TouchableOpacity onPress={handleEditEmail}>
                <Text>edit</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.profileData}>
              {editPhone && (
                <TextInput
                  style={styles.input}
                  // onChangeText={onChangeNumber}
                  // value={number}
                  placeholder="useless placeholder"
                  keyboardType="numeric"
                />
              )}
              {!editPhone && <Text style={styles.profileValue}>Phone</Text>}
              <TouchableOpacity onPress={handleEditPhone}>
                <Text>edit</Text>
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
                {!editGender && <Text style={styles.profileValue}>Gender</Text>}
                <TouchableOpacity onPress={handleEditGender}>
                  <Text>edit</Text>
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
                  <List.Item title="First item" />
                  <List.Item title="Second item" />
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
                  <List.Item title="First item" />
                  <List.Item title="Second item" />
                </List.Accordion>
              </List.Section>
            </View>
          </View>
        </View>
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
    width: 315,

    borderColor: '#02A8A8',
    borderRadius: 12,
  },
  profileData: {
    height: 80,

    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  flexDirectionColumn: {
    flexDirection: 'column',
  },
  editGenderParent: {flexDirection: 'row', gap: 10},
  accordion: {
    width: '100%',
  },
  titleStyle: {
    fontSize: 20,
  },
  accordionBg: {
    backgroundColor: 'white',
  },
  profileValue: {
    fontSize: 20,
  },
  ImageParent: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileDataContainer: {width: '100%', alignItems: 'center'},
  radioDirection: {flexDirection: 'row'},
  listAccordionStyle: {width: '100%', backgroundColor: 'white'},
});
