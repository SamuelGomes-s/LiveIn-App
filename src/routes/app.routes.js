import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home/home";
import Search from "../pages/Search/search";
import Profile from "../pages/Profile/profile";
import NewPost from "../pages/NewPost/newPost";
import PostsUser from "../pages/PostsUser/postsUser";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ApplicationRoutesTab = createBottomTabNavigator()
const ApplicationRoutesStack = createNativeStackNavigator()

export default function AppRoutes() {

    function StackRoutes() {
        return (<ApplicationRoutesStack.Navigator>
            <ApplicationRoutesStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <ApplicationRoutesStack.Screen name='NewPost' component={NewPost}
                options={{
                    title: 'Novo post',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000000DB'
                    }
                }} />
            <ApplicationRoutesStack.Screen name='PostUser' component={PostsUser}
                options={{
                    title: '',
                    headerTintColor: '#fff',
                    headerStyle: {
                        backgroundColor: '#000000DB'
                    }
                }}
            />
        </ApplicationRoutesStack.Navigator>
        )
    }

    return (
        <ApplicationRoutesTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: "#000000DB",
                    borderTopWidth: 0,
                    elevation: 0,
                    shadowOpacity: 0,
                }
            }}
        >
            <ApplicationRoutesTab.Screen name="HomeTab" component={StackRoutes} options={{
                tabBarIcon: ({ color, size }) => {
                    return <MaterialIcons name='home' color={color} size={size} />
                }
            }} />
            <ApplicationRoutesTab.Screen name="Search" component={Search} options={{
                tabBarIcon: ({ color, size }) => {
                    return <MaterialIcons name='search' color={color} size={size} />
                }
            }} />
            <ApplicationRoutesTab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ color, size }) => {
                    return <MaterialIcons name='person' color={color} size={size} />
                }
            }} />
        </ApplicationRoutesTab.Navigator>
    )
}