import {View,Text,FlatList, Image,TouchableOpacity,StyleSheet,useColorScheme} from 'react-native';
//import React, { useEffect, useState } from 'react'
import Typography from '@/constants/Typography';
//import { BASE_URL } from '@/constants/BaseURL';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

//import axios from 'axios';
import programsList from '../../assets/programList';

function programLineup() {
//  const [programs,setPrograms] = useState([]);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  /*
  const programHandler = async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/program/get`);
      if(response.data){
        setPrograms(response.data.programs);  
        console.log(response.data.programs);
      }else{
        console.log('Program data not available');
      }
      

    } catch (error) {
      console.error(error.message);
    }
  }
  useEffect(() => {
   programHandler()
  }, []);
 */



  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
      <ThemedText style={styles.headerText}>Programs</ThemedText>
            </ThemedView>
    <FlatList 
    horizontal={false} 
    style={{ paddingVertical: 5 }} 
    data={programsList}
    numColumns={2}
    columnWrapperStyle={{ gap: 10, paddingHorizontal: 12 }}
    contentContainerStyle={{ gap: 10, paddingBottom: 12 }}
    keyExtractor={(item, idx) => item + idx}
    showsVerticalScrollIndicator={false}
    renderItem={({ item }) => (
      <ThemedView style={styles.card}>
        <TouchableOpacity >
          <Image  source={item.img}
          style={styles.img} />
        
        <ThemedText style={[styles.timeText,
          { color: isDark ? 'black' : 'black' },]}>{item.startTime}</ThemedText>
        <ThemedText style={[styles.programText,
                  { color: isDark ? 'black' : 'black' }, ]}>{item.name}</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    )}
  />
  </ThemedView>
  )
}

export default programLineup;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header:{
    borderWidth: 2,
    padding: 10,
    borderColor: '#FF7F50', 
    backgroundColor: '#FFDAB9', 
    elevation: 4,
  },

  headerText: {
    color:'black',
    fontSize:Typography.fontSize.xl,
    fontWeight:Typography.fontWeight.semiBold,
    textAlign: 'center',
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  
  horizontalCard: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 240,
    width: 300,
    borderRadius: 20,
  },
  card: {
    width: 180,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    padding: 10,
  },
  img: {
    height: 140,
    width: "100%",
    borderRadius: 10,
  },
  programText: {
    fontSize: 16,
    textAlign: 'center',
    paddingVertical: 8,
  },
  timeText:{
    textAlign:'center',
    fontSize:14,
    paddingTop:25,
  }
});