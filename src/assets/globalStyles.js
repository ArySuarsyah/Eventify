import {StyleSheet} from 'react-native';

const globalStyle = StyleSheet.create({
  subtitle: {
    color: 'black',
    fontSize: 18,
  },
  inputParent: {alignItems: 'center', padding: 10, gap: 20},
  input: {
    color: 'black',
    padding: 10,
    height: 60,
    width: 315,
    borderWidth: 1,
    borderColor: '#02A8A8',
    borderRadius: 12,
  },
  container: {
    padding: 10,
    flex: 1,
  },
  registerHeader: {
    padding: 45,
    gap: 5,
    justifyContent: 'center',
  },
  authTitle: {fontSize: 24, color: 'black'},
  subTitleContainer: {flexDirection: 'row'},
  subtitleLink: {color: 'blue', fontSize: 18},
  formContainer: {
    gap: 20,
    flex: 1,
  },
  inputPasswordContainer: {
    borderWidth: 1,
    width: 315,
    flexDirection: 'row',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 20,
    height: 60,
    borderColor: '#02A8A8',
  },
  inputPassword: {flexGrow: 1, flexDirection: 'column', color: 'black'},
  checkBoxContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
    gap: 5,
  },
  buttonContainer: {
    backgroundColor: '#018383',
    padding: 10,
    borderRadius: 5,
    width: 315,
    height: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  forgotContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 40,
  },
  forgotLink: {color: '#02A8A8', fontSize: 18},
  iconTitle: {
    color: 'black',
    fontSize: 18,
  },
  iconContainer: {alignItems: 'center', marginVertical: 50, gap: 15},
  iconParent: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLogin: {
    borderWidth: 1,
    borderColor: '#02A8A8',
    padding: 20,
    width: 100,
    height: 70,
    alignItems: 'center',
    borderRadius: 18,
  },
  outer: {
    height: 'screen',
  },
  textButton: {
    color: 'white',
  },
  saveArea: {height: '100%'},
  errorText: {color: '#FF0000', alignSelf: 'flex-start', marginHorizontal: 25},
  searchBar: {
    flexDirection: 'row',
    backgroundColor: '#e5e9f0',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 18,
    borderBlockColor: '#02A8A8',
    borderWidth: 1,
  },
  profileNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigationContainer: {
    paddingVertical: 20,
    paddingLeft: 10,
    gap: 50,
  },
  drawerUserImage: {
    borderRadius: 70,
    overflow: 'hidden',
    width: 70,
    borderWidth: 1,
    borderColor: '#42E6A4',
    height: 70,
  },
  drawerNavList: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingLeft: 10,
    paddingVertical: 20,
  },
  drawerNavPoint: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  redColor: {color: '#f03e3e'},
  bgGradient: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  imgEvent: {
    borderWidth: 1,
    borderColor: '#000000',
    width: '100%',
    height: '100%',
  },
  userImage: {
    padding: 5,
    borderRadius: 100,
    overflow: 'hidden',
    width: 100,
    borderWidth: 2,
    borderColor: '#42E6A4',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingHeader: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
  },
  bookingFooter: {
    flexDirection: 'row',
    padding: 20,
    marginTop: 15,
    gap: 10,
  },
  textHeader: {
    color: '#000',
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    paddingRight: 30,
    fontWeight: 'bold',
  },
  stadiumContainer: {
    padding: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  stadiumImg: {
    width: '90%',
    height: 276,
  },
  ticketPrice: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingVertical: 30,
  },
  byPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  swapIcon: {
    transform: [{rotate: '87deg'}],
  },
  sectionContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
  },
  sectionName: {flex: 1, alignItems: 'center'},
  bookingButton: {
    backgroundColor: '#018383',
    width: '50%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  result: {
    width: '50%',
    alignItems: 'center',
  },
  resultLeftSide: {
    flexDirection: 'row',
    width: '100%',
    height: 40,
    gap: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noTicket: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '60%',
  },
  fontLarge: {fontSize: 24},
  detailNoTicket: {
    maxWidth: '60%',
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 15,
  },
  dataContainer: {
    paddingHorizontal: 20,
    gap: 50,
    paddingTop: 50,
    paddingBottom: 20,
  },
  monthParent: {
    borderRadius: 20,
    width: '30%',
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#dedede',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 22,
    elevation: 5,
  },
  monthStyle: {flexDirection: 'row', alignItems: 'center', gap: 10},
  monthData: {fontSize: 20, color: '#02A8A8'},
  myBokingContaner: {flexDirection: 'row', gap: 20},
  dateStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    width: 50,
    height: 60,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.9,
    shadowRadius: 22,
    elevation: 10,
  },
  date: {fontSize: 14, color: '#F5DEA3'},
  fontData: {fontSize: 18},
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    height: '30%',
    width: '60%',
    alignItems: 'center',
    gap: 20,
  },
  modalStyle: {
    borderWidth: 1,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  buttonHeight: {height: 40},
  iconSuccess: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009acd',
  },
  button: {
    width: '30%',
    backgroundColor: '#018383',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCenter: {textAlign: 'center'},
  iconFailed: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee6363',
  },
  colorWhite: {
    color: 'white',
  },
  containerProfileDrawwer: {
    paddingVertical: 50,
    paddingHorizontal: 20,
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fotoDrawwer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#4c3f91',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  fotoIcon: {
    width: 55,
    height: 55,
    backgroundColor: 'gray',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  IMGProfiles: {
    objectFit: 'cover',
    width: 60,
    height: 60,
  },
  textFullname: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    color: 'black',
    width: 240,
  },
  textProfession: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
    color: 'grey',
  },
  textTitleWhite: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default globalStyle;
