import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./src/reducers";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import PhoneBox from "./src/components/PhoneBox";
import PhoneForm from "./src/components/PhoneForm";

const store = createStore(rootReducer, applyMiddleware(thunk));
const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={PhoneBox} options={{ headerShown: false }} />
          <Stack.Screen name="Add" component={PhoneForm} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
