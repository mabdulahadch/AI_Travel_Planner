import { Text, View } from "react-native";
import Login from '../component/login';
import {auth} from '../configs/firebaseConfig'
import { Redirect } from "expo-router";

export default function Index() {

  const user=auth.currentUser;

  return (
    <View
      style={{
        flex: 1,
      }}
    > 

      {
        user?<Redirect href={'/mytrip'}/>:<Login/>
      }
      {/* <Login/> */}
    </View>
  );
}