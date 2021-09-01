
import React, { useState } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, StyleSheet, Button, ScrollView } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      breakfast: [],
      lunch: [],
      dinner: []
    }
  }
  async componentDidUpdate()
  {
    let meals = await AsyncStorage.getItem("meals");
    meals = JSON.parse(meals);

    this.setState({
      breakfast: meals.filter(m => m.mealtype === 'breakfast'),
      lunch: meals.filter(m => m.mealtype === 'lunch'),
      dinner: meals.filter(m => m.mealtype === 'dinner')
    })

  }
  async componentDidMount() {
    let meals = await AsyncStorage.getItem("meals");
    meals = JSON.parse(meals);

    this.setState({
      breakfast: meals.filter(m => m.mealtype === 'breakfast'),
      lunch: meals.filter(m => m.mealtype === 'lunch'),
      dinner: meals.filter(m => m.mealtype === 'dinner')
    })

  }
  render() {
    return <ScrollView style={styles.container}>

      <View style={styles.itemsContainer}>
        <View >

          <Text style={styles.text}>Breakfast</Text>
        </View>
        {

          this.state.breakfast.map((meal) => {
            return (<View key={meal._id} style={styles.meal} >
              <Text style={styles.mealName}>Meal name:{meal.name}</Text>
              <Text style={styles.mealCalories}>Meal calories:{meal.calories}</Text>
            </View>)
          })
        }

      </View>


      <View style={styles.itemsContainer}>
        <View >

          <Text style={styles.text}>Lunch</Text>
        </View>
        {

          this.state.lunch.map((meal) => {
            return (<View key={meal._id} style={styles.meal} >
              <Text style={styles.mealName}>Meal name:{meal.name}</Text>
              <Text style={styles.mealCalories}>Meal calories:{meal.calories}</Text>
            </View>)
          })
        }

      </View>

      <View style={styles.itemsContainer}>
        <View >

          <Text style={styles.text}>Dinner</Text>
        </View>
        {

          this.state.dinner.map((meal) => {
            return (<View key={meal._id} style={styles.meal} >
              <Text style={styles.mealName}>Meal name:{meal.name}</Text>
              <Text style={styles.mealCalories}>Meal calories:{meal.calories}</Text>
            </View>)
          })
        }

      </View>
    </ScrollView>
  }
};

export default HomeScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 30,
    width: '100%',
    borderWidth: 3,
    color: 'white',
    paddingLeft: 10,
    fontWeight: 'bold',
    borderColor: '#6067A8'
  },
  itemsContainer: {
    display: 'flex',
    backgroundColor: '#6067A8',
    width: '80%',
    marginLeft: '10%',
    marginTop: 20
  },
  textButton: {

    textAlign: 'center',
    paddingTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  button: {
    width: '20%',
    backgroundColor: '#BCC2F5',
  },
  meal: {
    backgroundColor: 'pink',
    margin: 10,
    borderRadius: 8,
  },
  mealName: {
    color: 'black',
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold'
  },
  mealCalories: {
    color: 'black',
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold'
  }
});