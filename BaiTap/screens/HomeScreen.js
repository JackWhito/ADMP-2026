import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeSideBar from "../components/HomeSideBar.js";
import HomeArea from "../components/HomeArea.js";

export default function HomeScreen({ navigation }) {

  const {top} = useSafeAreaInsets();
  return (
    <View style={[styles.container,{paddingTop: top}]}>
      <HomeSideBar />
      <HomeArea/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#020617",
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
  },
  control: {
    margin: 12,
    alignContent: "space-between",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%"
  }
});
