import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {TextInput, List, TouchableRipple} from 'react-native-paper';
import React from 'react';
import globalStyle from '../../assets/globalStyles';
import AntDesign from 'react-native-vector-icons/dist/AntDesign';

import {Formik} from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

const validationSchema = Yup.object({
  name: Yup.string().required('Event name cannot be empty'),
  price: Yup.string().required('Event Price cannot be empty'),
  detail: Yup.string().required('Event Detail cannot be empty'),
});

export default function Create() {
  const [open, setOpen] = React.useState(false);
  const [dataDate, setDataDate] = React.useState(new Date());
  const [location, setLocation] = React.useState('');
  const [selectedLocation, setSelectedLocation] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');

  const cities = [
    'Jakarta',
    'Bandung',
    'Bali',
    'Aceh',
    'Solo',
    'Yogyakarta',
    'Semarang',
  ];
  const categoryEvent = [
    'Sport',
    'Arts',
    'Outdoors',
    'Workshop',
    'Festival',
    'Fashion',
    'Music',
  ];

  const getLocation = (index, city) => {
    setLocation(index);
    setSelectedLocation(city);
  };

  const getCategory = (index, item) => {
    setCategory(index);
    setSelectedCategory(item);
  };

  const chooseFhoto = ['Open Galeri', 'Open Camera'];
  const doCreate = values => {
    const form = new FormData();
    // form.append('picture', pictureData)
    form.append('title', values.name);
    form.append('price', values.price);
    form.append('date', dataDate);
    form.append('cityId', location);
    form.append('categoryId', category);
    form.append('description', values.detail);

    console.log(form);
  };

  return (
    <ScrollView>
      <View>
        <View style={globalStyle.bookingHeader}>
          <AntDesign name="arrowleft" size={30} color="#02A8A8" />
          <Text style={globalStyle.textHeader}>Create</Text>
        </View>
        <View style={globalStyle.dataContainer}>
          <Formik
            initialValues={{
              name: '',
              price: '',
              detail: '',
            }}
            validationSchema={validationSchema}
            onSubmit={doCreate}>
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={{gap: 10}}>
                <TextInput
                  label="Name"
                  style={styles.inputStyle}
                  value={values.name}
                  activeUnderlineColor="#02A8A8"
                  underlineColor="#02A8A8"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
                <List.Section style={styles.containerAccordion}>
                  <List.Accordion
                    title={selectedLocation ? selectedLocation : 'Location'}
                    style={styles.accordion}>
                    {cities.map((city, index) => (
                      <TouchableRipple
                        key={index}
                        onPress={() => getLocation(index + 1, city)}>
                        <List.Item title={city} />
                      </TouchableRipple>
                    ))}
                  </List.Accordion>
                </List.Section>
                <TextInput
                  label="Price"
                  style={styles.inputStyle}
                  value={values.price}
                  activeUnderlineColor="#02A8A8"
                  underlineColor="#02A8A8"
                  onChangeText={handleChange('price')}
                  onBlur={handleBlur('price')}
                />
                {errors.price && touched.price && (
                  <Text style={styles.errorText}>{errors.price}</Text>
                )}
                <List.Section style={styles.containerAccordion}>
                  <List.Accordion
                    title={selectedCategory ? selectedCategory : 'Category'}
                    style={styles.accordion}>
                    {categoryEvent.map((item, index) => (
                      <TouchableRipple
                        key={index}
                        onPress={() => getCategory(index + 1, item)}>
                        <List.Item title={item} />
                      </TouchableRipple>
                    ))}
                  </List.Accordion>
                </List.Section>
                <TouchableRipple onPress={() => setOpen(!open)}>
                  <View style={[styles.inputStyle, styles.setDate]}>
                    {open && (
                      <View style={styles.date}>
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
                        <Text style={styles.textBlack}>
                          {moment(dataDate).format('YYYY-MMM-DD')}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.textBlack}>{!open && 'Set Date'}</Text>
                  </View>
                </TouchableRipple>
                <List.Section style={styles.containerAccordion}>
                  <List.Accordion title="Choose Fhoto" style={styles.accordion}>
                    {chooseFhoto.map((item, index) => (
                      <TouchableRipple
                        key={index}
                        onPress={() => console.log(index + 1)}>
                        <List.Item title={item} />
                      </TouchableRipple>
                    ))}
                  </List.Accordion>
                </List.Section>
                <TextInput
                  multiline={true}
                  label="Even Detail"
                  style={styles.inputStyle}
                  value={values.detail}
                  activeUnderlineColor="#02A8A8"
                  underlineColor="#02A8A8"
                  onChangeText={handleChange('detail')}
                  onBlur={handleBlur('detail')}
                />
                {errors.detail && touched.detail && (
                  <Text style={styles.errorText}>{errors.detail}</Text>
                )}
                <TouchableRipple
                  style={styles.buttonContainer}
                  onPress={handleSubmit}>
                  <Text style={globalStyle.textButton}>Create Event</Text>
                </TouchableRipple>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    backgroundColor: 'white',
    height: 70,
    justifyContent: 'center',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  accordion: {
    borderBottomWidth: 1,
    borderBottomColor: '#02A8A8',
    backgroundColor: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  containerAccordion: {
    backgroundColor: 'white',
  },
  setDate: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  textBlack: {color: 'black'},
  date: {
    justifyContent: 'center',
    height: 30,
    marginTop: 17,
  },
  detailStyle: {
    height: 150,
    backgroundColor: 'white',
  },
  buttonContainer: {
    marginTop: 10,
    backgroundColor: '#018383',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
});
