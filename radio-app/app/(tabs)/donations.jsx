import { View, Text,  StyleSheet, useColorScheme,Image} from "react-native";
import Typography from '@/constants/Typography';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

import donateImg from '../../assets/images/donate_1.png';

export default function DonationForm() {

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.headerText}>Donations</ThemedText>
      </ThemedView>
      <ThemedView style={styles.formContainer}>
      <ThemedText style={[styles.title , { color: isDark ? 'black' : 'black' },]}>Donate For Us</ThemedText>
        <Image source={donateImg}  style={styles.donationImage} resizeMode="contain"/>

            <ThemedText style={[styles.donationInfo , {color: isDark ? 'black' : 'black'}]}>Seth Fm Account Name - The Friend Media Network (Pvt) Ltd
            </ThemedText>
            <ThemedText style={[ styles.donationInfo ,{color: isDark ? 'black' : 'black'}]}>Account Number - 034100112463690
            </ThemedText>
            <ThemedText style={[ styles.donationInfo ,{color: isDark ? 'black' : 'black'}]}>Bank - Peoples Bank Negombo
            </ThemedText>
            <ThemedText style={[ styles.donationInfo ,{color: isDark ? 'black' : 'black'}]}>Whatsapp - 0757104487</ThemedText>
          
      </ThemedView>
        </ThemedView>
    
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  header: {
    borderWidth: 2,
    padding: 10,
    borderColor: '#FF7F50', 
    backgroundColor: '#FFDAB9', 
    elevation: 4,
  },
  headerText: {
    color:'black',
    textAlign: "center",
    fontSize:Typography.fontSize.xl,
    fontWeight:Typography.fontWeight.semiBold,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
    textAlign:'center',
    fontSize:Typography.fontSize.xl
  },
  formContainer: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 30,
    margin:10
  },
  donationImage: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  donationInfo:{
    fontSize:Typography.fontSize.md,
    fontWeight:Typography.fontWeight.small,
    padding:2,
  },
});
