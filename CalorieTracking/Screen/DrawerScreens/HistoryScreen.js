
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class HistoryScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      meals: []
    }
  }

  async  componentDidMount() {

    let user = await AsyncStorage.getItem("user_id");
    user = JSON.parse(user);

    fetch('http://192.168.43.47:3000/history/' + user.id, {
      method: 'GET',
    })
      .then((response) => {
        response.json().then((object) => {

          this.setState({
            meals:object.meals
          })
        })
      })
      .catch((err) => console.log(err))
  }
  render() {
    return <ScrollView style={styles.container}>
    {

      this.state.meals.map((meal) => {
        return (<View key={meal._id} style={styles.meal} >
          <Text style={styles.mealName}>Meal name:{meal.name}</Text>
          <Text style={styles.mealCalories}>Meal calories:{meal.calories}</Text>
          <Text style={styles.mealCalories}>Date:{meal.date.toString().substr(0,16)}</Text>
        </View>)
      })
    }
    </ScrollView>

  }
};

export default HistoryScreen;
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