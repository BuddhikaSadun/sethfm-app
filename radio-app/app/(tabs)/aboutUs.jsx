import { View, Text, TextInput, Button, StyleSheet, Linking, TouchableOpacity, ScrollView, useColorScheme } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import Typography from '@/constants/Typography';
import axios from 'axios';
import { BASE_URL } from '@/constants/BaseURL';

import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';


export default function AboutUs() {

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  

  
  const handleSubmit = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.message) {
      alert('Please fill out all fields.');
      return;
    }
  
    if (!isValidEmail(form.email)) {
      alert('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await axios.post(`${BASE_URL}/feedback/create`, form);
      alert('Thank you for your feedback!');
      setForm({ firstName: '', lastName: '', email: '', message: '' }); // reset form
    } catch (error) {
      console.error("Submission error:", error.message);
      alert("Failed to send feedback. Please try again.");
    }
  };
  
  
  const inputStyle = [styles.input, isDark ? styles.darkInput : styles.lightInput];

  return (
    <ScrollView style={isDark ? styles.darkContainer : styles.lightContainer}>
      <ThemedView style={styles.header}>
              <ThemedText style={styles.headerText}>Contact Us</ThemedText>
            </ThemedView>
      <ThemedView  style={isDark ? styles.darkMessageForm :styles.messageForm}>
        <ThemedText style={styles.messageTitle}>Write us a message below</ThemedText>
        <ThemedText >First Name</ThemedText>
        <TextInput
          style={inputStyle}
          placeholder="Enter First Name"
          placeholderTextColor='grey'

          value={form.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />
        <ThemedText >Last Name</ThemedText>
        <TextInput
          style={inputStyle}
          placeholder="Enter Last Name"
          placeholderTextColor='grey'
          value={form.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />
        <ThemedText > Email</ThemedText>
        <TextInput
          style={inputStyle}
          placeholder="Enter Email"
          keyboardType="email-address"
          placeholderTextColor='grey'
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        <ThemedText >Message</ThemedText>
        <TextInput
          style={[...inputStyle, styles.textArea]}
          placeholder="Enter Message"
          placeholderTextColor='grey'
          multiline
          numberOfLines={4}
          value={form.message}
          onChangeText={(text) => handleChange('message', text)}
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ThemedView>


      <ThemedView style={[styles.InfoContainer, { borderColor: isDark ? 'white' : 'black' }]}>

      <ThemedText style={styles.titleRequest}>Request Us</ThemedText>

      
      <ThemedView style={[styles.infoSection , {paddingBottom:10}]}>
        
          <FontAwesome name="phone" size={28}  color={isDark ? 'white' : 'black'}/>
          <ThemedText style={[styles.infoText , { paddingRight:80} ]}>+94 31 222 8181</ThemedText>
        </ThemedView>


        <ThemedText style={styles.titleRequest}>Contact Information</ThemedText>

      <ThemedView style={styles.infoWrap}>
        <ThemedView style={styles.infoSection}>
          <FontAwesome name="phone" size={28}  style={{ alignContent:'center' }} color={isDark ? 'white' : 'black'}/>
          <ThemedText style={styles.infoText}>+94 76 317 5778</ThemedText>
        </ThemedView>

        <ThemedView style={styles.infoSection}>
        <FontAwesome name="envelope" size={28} style={{ alignContent:'center' }}  color={isDark ? 'white' : 'black'}/>
          <ThemedText style={styles.infoText}>jayamahasupun@gmail.com</ThemedText>
          </ThemedView>
      </ThemedView>



        <ThemedView style={[styles.infoSection, {paddingLeft:50}]}>
        <FontAwesome name="map-marker" size={30}  style={{ alignContent:'center' }}  color={isDark ? 'white' : 'black'}/>
          <ThemedText style={styles.infoText}>
          St Mary’s Church Jubilee Hall,
          Grand St, Negombo 11500 
          </ThemedText>
        </ThemedView>

        
        <ThemedView style={styles.socialIcons}>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/@sethfm-f1n')}>
            <FontAwesome6 name="youtube" size={30}  color={isDark ? 'white' : 'black'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.sethfm.lk')}>
            <FontAwesome6 name="google" size={30}  color={isDark ? 'white' : 'black'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.facebook.com/sethfm103.1/')}>
            <FontAwesome6 name="facebook" size={30} color={isDark ? 'white' : 'black'}/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/sethfmlk/?hl=en')}>
            <FontAwesome6 name="instagram" size={30} color={isDark ? 'white' : 'black'}/>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: '#fdfdfd',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },

  header: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#FF7F50', 
    backgroundColor: '#FFDAB9', 
    elevation: 4,
  },
  headerText: {
    color:"black",
    textAlign: "center",
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.semiBold,
  },

  messageForm: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderColor:'black',
  },
  darkMessageForm:{
    backgroundColor: '#393B38',
    padding: 20,
    borderColor:'white',
    
  },
  messageTitle: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  lightInput: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#000',
  },
  darkInput: {
    borderColor: '#666',
    color: '#fff',
    backgroundColor: '#1e1e1e',
  },
  textArea: {
    height: 100,
  },

  titleRequest: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  InfoContainer: {
    borderWidth: 2,
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  infoSection: {
    flexDirection: 'row',
    marginBottom: 25,
  },

  infoText: {
    fontSize: 16,
    marginLeft: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 20,
    width: '75%',
    justifyContent: 'space-between',
  },
});