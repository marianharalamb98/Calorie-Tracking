import React, { useState, createRef } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';

import AsyncStorage from '@react-native-community/async-storage';

import {
    StyleSheet,
    TextInput,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Loader from '../Components/Loader';

const AddFoodScreen = (props) => {

    const [name, setMealName] = useState('');
    const [calories, setMealCalories] = useState('');
    const [mealtype, setMealType] = useState('');
    const [loading, setLoading] = useState(false);
    const [errortext, setErrortext] = useState('');

    const [
        isSuccess,
        setIsSuccess
    ] = useState(false);
    const nameInputRef = createRef();
    const caloriesInputRef = createRef();
    const mealtypeInputRef = createRef();

    const handleSubmitButton = () => {
        setErrortext('');
        if (!name) {
            alert('Please fill Food Name');
            return;
        }
        if (!calories) {
            alert('Please fill number of calories');
            return;
        }
        
        setLoading(true);
        AsyncStorage.getItem("user_id").then((user) => {
            user = JSON.parse(user);
            fetch('http://192.168.43.47:3000/addFood', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "calories": calories,
                    "mealtype": mealtype.value,
                    "date": new Date(),
                    "userId": user.id
                }),

            })
                .then((response) => {
                    if (response.status === 204) {
                        fetch('http://192.168.43.47:3000/meals/' + user.id, {
                            method: 'GET',
                        })
                            .then((response) => {
                                response.json().then((object) => {

                                    AsyncStorage.setItem(
                                        'meals', JSON.stringify(object.meals)

                                    ).then(() => {
                                        setIsSuccess(true);
                                       
                                    });

                                })
                            })
                            .catch((err) => console.log(err))

                    } else {
                        setErrortext('Unsuccessfully');
                        setLoading(false);
                    }

                })

                .catch((error) => {
                    setLoading(false);
                    console.error(error);
                });
        })
    };
    if (isSuccess) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#307ecc',
                    justifyContent: 'center',
                }}>
                <Image
                    source={require('../../Image/success.png')}
                    style={{
                        height: 150,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />
                <Text style={styles.successTextStyle}>
                    Meal added Successfullly
      </Text>
                <TouchableOpacity
                    style={styles.buttonStyle}
                    activeOpacity={0.5}
                    onPress={() => {
                        setIsSuccess(false);
                        props.navigation.navigate('HomeScreen', {})

                    }}>
                    <Text style={styles.buttonTextStyle}>Home</Text>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
            <Loader loading={loading} />
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignContent: 'center',
                }}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../Image/aboutreact.png')}
                        style={{
                            width: '50%',
                            height: 100,
                            resizeMode: 'contain',
                            margin: 30,
                        }}
                    />
                </View>
                <KeyboardAvoidingView enabled>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={
                                (Name) => setMealName(Name)
                            }
                            underlineColorAndroid="#f000"
                            placeholder="Enter Meal Name"
                            placeholderTextColor="#8b9cb5"
                            ref={nameInputRef}
                            returnKeyType="next"
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <TextInput
                            style={styles.inputStyle}
                            onChangeText={
                                (Calories) => setMealCalories(Calories)
                            }
                            placeholder="Enter Calories"
                            placeholderTextColor="#8b9cb5"
                            keyboardType="default"
                            ref={caloriesInputRef}
                            onSubmitEditing={Keyboard.dismiss}
                            blurOnSubmit={false}
                            underlineColorAndroid="#f000"
                            returnKeyType="next"
                        />
                    </View>
                    <View style={styles.SectionStyle}>
                        <DropDownPicker
                            items={[
                                { label: 'Breakfast', value: 'breakfast' },
                                { label: 'Lunch', value: 'lunch' },
                                { label: 'Dinner', value: 'dinner' },
                            ]}
                            defaultValue="breakfast"
                            containerStyle={{ height: 40 }}

                            dropDownStyle={{ backgroundColor: '#307ecc' }}
                            onChangeItem={(Mealtype) => setMealType(Mealtype)}
                            itemStyle={{
                                height: 20
                            }}
                            style={{
                                width: 340,
                                borderRadius: 20,
                                backgroundColor: '#307ecc',
                                borderTopLeftRadius: 10, borderTopRightRadius: 10,
                                borderBottomLeftRadius: 10, borderBottomRightRadius: 10

                            }}
                            labelStyle={{
                                textAlign: 'left',
                                color: 'white'
                            }}
                            dropDownStyle={{
                                borderBottomLeftRadius: 20, borderBottomRightRadius: 20,
                                backgroundColor: '#307ecc',

                            }}
                        />

                    </View>
                    {errortext != '' ? (
                        <Text style={styles.errorTextStyle}>
                            {errortext}
                        </Text>
                    ) : null}
                    <TouchableOpacity
                        style={styles.buttonStyle}
                        activeOpacity={0.5}
                        onPress={handleSubmitButton}>
                        <Text style={styles.buttonTextStyle}>
                            SUMBIT
    </Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </ScrollView>
        </View>
    );
}

export default AddFoodScreen;

const styles = StyleSheet.create({
    SectionStyle: {
        flexDirection: 'row',
        height: 40,
        marginTop: 20,
        marginLeft: 35,
        marginRight: 35,
        margin: 10,
    },
    buttonStyle: {
        backgroundColor: '#7DE24E',
        borderWidth: 0,
        color: '#FFFFFF',
        borderColor: '#7DE24E',
        height: 40,
        alignItems: 'center',
        borderRadius: 30,
        marginLeft: 35,
        marginRight: 35,
        marginTop: 20,
        marginBottom: 20,
    },
    buttonTextStyle: {
        color: '#FFFFFF',
        paddingVertical: 10,
        fontSize: 16,
    },
    inputStyle: {
        flex: 1,
        color: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: '#dadae8',
    },
    errorTextStyle: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
    },
    successTextStyle: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        padding: 30,
    },
});
