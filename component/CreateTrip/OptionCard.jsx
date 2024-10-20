import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function OptionCard({ option, selectedOption }) {
  const isSelected = selectedOption?.id == option?.id;

  return (
    <View                                     
      style={[                                
        styles.container,                     
        isSelected && styles.selectedContainer,
      ]}
    >
      <View>
        <Text style={styles.title}>
          {option?.title}
          {option?.people}
        </Text>
        <Text style={styles.desc}>
          {option?.desc}
        </Text>
      </View>
      <View>
        <Text style={styles.icon}>
          {option?.icon}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 40,
    borderColor: Colors.GREY,
    borderWidth:0.5,
    borderRadius: 30,
  },
  selectedContainer: {
    backgroundColor: Colors.Light_GREY,
    borderRadius: 30,
    borderColor: Colors.GREY,
    borderWidth:0.5
  },
  title: {
    fontFamily: 'outfit-bold',
    fontSize: 20,
  },
  desc: {
    fontFamily: 'outfit',
    fontSize: 15,
    color: Colors.GREY,
  },
  icon: {
    fontFamily: 'outfit',
    fontSize: 30,
  },
});
