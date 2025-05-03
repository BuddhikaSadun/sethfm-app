import { View, Text,StyleSheet,Image,TouchableOpacity,FlatList, useColorScheme, ActivityIndicator} from 'react-native'
import React,{useState, useEffect,useRef} from 'react';

import logo from '../../assets/images/SethFMLogo.png';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Audio} from 'expo-av';

import programs from '../../assets/programs.jsx';
import Typography from '@/constants/Typography';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

const convertTimeToSeconds = (timeStr) => {
  const timeParts = timeStr.split(/[: ]/);
  let hour = parseInt(timeParts[0], 10);
  let minute = parseInt(timeParts[1], 10);
  let second = parseInt(timeParts[2], 10);
  if (timeParts[3] === 'pm' && hour !== 12) hour += 12;
  if (timeParts[3] === 'am' && hour === 12) hour = 0;
  return hour * 3600 + minute * 60 + second;
};

const getCurrentProgram = () => {
  const now = new Date();
  const currentTime = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  for (let program of programs) {
    const startTimeInSeconds = convertTimeToSeconds(program.startTime);
    const endTimeInSeconds = convertTimeToSeconds(program.endTime);

    // Handle overnight programs
    if (endTimeInSeconds < startTimeInSeconds) {
      if (currentTime >= startTimeInSeconds || currentTime <= endTimeInSeconds) {
        return program;
      }
    } else if (currentTime >= startTimeInSeconds && currentTime <= endTimeInSeconds) {
      return program;
    }
  }
  return null;
};

const getUpcomingPrograms = (currentProgram) => {
  if (!currentProgram) return [];

  const currentProgramStart = convertTimeToSeconds(currentProgram.startTime);

  return programs
    .filter((program) => convertTimeToSeconds(program.startTime) > currentProgramStart)
    .sort((a, b) => convertTimeToSeconds(a.startTime) - convertTimeToSeconds(b.startTime));
};

export default function Player() {

  const colorScheme = useColorScheme();
  const themeContainerStyle = colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;
  const themeTextStyle = colorScheme === 'light' ? styles.darkThemeText :styles.lightThemeText;

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [sound, setSound] = useState(null);
  const [currentProgram, setCurrentProgram] = useState(getCurrentProgram());
  const [upcomingPrograms, setUpcomingPrograms] = useState(getUpcomingPrograms(getCurrentProgram()));

  const isMounted = useRef(true);
  const audioSource = 'https://listen.radioking.com/radio/384487/stream/435781';

  useEffect(() => {
    isMounted.current = true;

    const interval = setInterval(() => {
      const updatedCurrentProgram = getCurrentProgram();
      setCurrentProgram(updatedCurrentProgram);
      setUpcomingPrograms(getUpcomingPrograms(updatedCurrentProgram));
    }, 60000);
    return () => {
      isMounted.current = false;
      clearInterval(interval);
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

 // Automatically start playing audio on mount
 useEffect(() => {
  const startPlayback = async () => {
    try {
      setIsLoading(true); // Start loading indicator
      if (sound === null && isMounted.current) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: audioSource },
          { shouldPlay: true }
        );
        if (isMounted.current) {
          setSound(newSound);
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Audio playback failed:", error);
    } finally {
      setIsLoading(false); // Hide loading once ready
    }
  };

  startPlayback();
}, []);



const togglePlayPause = async () => {
  if (!isMounted.current) return;

  if (sound === null) {
    try {
      setIsLoading(true);
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioSource },
        { shouldPlay: true }
      );
      if (isMounted.current) {
        setSound(newSound);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Audio toggle failed:", error);
    } finally {
      setIsLoading(false);
    }
  } else {
    if (isPlaying) {
      await sound.pauseAsync();
      if (isMounted.current) setIsPlaying(false);
    } else {
      await sound.playAsync();
      if (isMounted.current) setIsPlaying(true);
    }
  }
};

  return (
    <View style={[{ flex: 1 }, themeContainerStyle]}>
      <View style={styles.header}>
              <Text style={styles.headerText}>Live Radio</Text>
            </View>
      <FlatList
        data={upcomingPrograms}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={(
          <>
            {currentProgram ? (
              isLoading ? (
                <View style={styles.programContainer}>
                  <Image source={logo} style={styles.img} resizeMode="contain" />
                  <ActivityIndicator size={60} color="black" />
                </View>
              ) : (
                <View style={styles.programContainer}>
                  <Image source={logo} style={styles.img} resizeMode="contain" />
                  <TouchableOpacity onPress={togglePlayPause} style={styles.button}>
                    {isPlaying ? (
                      <MaterialIcons name="pause-circle-outline" size={60} color="black" />
                    ) : (
                      <MaterialIcons name="play-circle-fill" size={60} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
              )
            ) : (
              <Text style={styles.programName}>No program currently playing</Text>
            )}

            <Text style={[styles.programName, themeTextStyle]}>{currentProgram?.name}</Text>
            <Text style={[styles.category, themeTextStyle]}>{currentProgram?.description}</Text>

            <ThemedView style={styles.companyTag}>
              <ThemedText style={{ fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semiBold }}>
                The Friend Media Network (Pvt) Ltd
              </ThemedText>
              <ThemedText style={{ fontSize: Typography.fontSize.md, fontWeight: Typography.fontWeight.semiBold }}>
                Seth Fm 103.1
              </ThemedText>
            </ThemedView>

            <Text style={[styles.upcomingText, themeTextStyle]}>Upcoming Programs</Text>
          </>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.programItem}>
            <Text style={[styles.programName]}>{item.name}</Text>
            <Text style={styles.category}>{item.startTime} - {item.endTime}</Text>
          </TouchableOpacity>
        )}
      />
      
    </View>
  );
}
const styles = StyleSheet.create({
  header:{
    borderWidth: 2,
    padding: 10,
    borderColor: '#FF7F50', 
    backgroundColor: '#FFDAB9', 
    elevation: 4,
  },
  headerText:{
    textAlign:'center',
    fontSize:Typography.fontSize.xl,
    fontWeight:Typography.fontWeight.semiBold,
  },
  
  listContainer: {
    maxHeight: 300, // Set a height limit so it scrolls
  },
  programContainer:{
    margin:20,
    borderWidth:2,
    borderRadius:10,
    borderColor:'#ffd9b3',
    backgroundColor: '#ffd9b3',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  
    // Elevation for Android
    elevation: 5,
  },
img:{
  width: 300,
  height: 350,
  alignSelf:'center'
},

button: {
  alignSelf: 'center',
  paddingBottom:20,
},
companyTag:{
  marginTop:40,
  alignItems:'center',
  borderColor:'black',
  
  width:'100%'
},
upcomingText:{
  margin:20,
  fontSize:Typography.fontSize.xl,
  fontWeight:Typography.fontWeight.semiBold,
  paddingTop:20,

},
programName:{
  textAlign:'center',
  fontSize:Typography.fontSize.lg,
  fontWeight:Typography.fontWeight.medium,
},
category:{
  textAlign:'center',
  fontSize:Typography.fontSize.md,
  fontWeight:Typography.fontWeight.small,
  color:'grey',
},
programItem: {
  paddingVertical: 10,
  borderBottomWidth: 3,
  borderBottomColor: 'orange',
  backgroundColor:'#ffd9b3',
  marginVertical: 12,             
  width: '85%',                  
  alignSelf: 'center',         
  borderRadius: 30,   
},

lightContainer: {
  backgroundColor: 'white',
},
darkContainer: {
  backgroundColor: '#121212',
},
lightThemeText: {
  color: 'white',
},
darkThemeText: {
  color: 'black',
},

});
