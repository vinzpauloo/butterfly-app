import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const StackNavigators = ({ data }) => {
  const { initialRoute, screenOptions, screens } = data;
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={screenOptions}
    >
      {screens?.map((item, index) => (
        <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

export default StackNavigators;
