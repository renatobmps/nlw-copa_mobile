import { NativeBaseProvider, StatusBar } from "native-base";
import { THEME } from "./src/style/theme";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Loading } from "./src/components/Loading";
import { AuthContextProvider } from "./src/contexts/AuthContext";
import { SigIn } from "./src/screens/SignIn";
import { New } from "./src/screens/New";
import { Find } from "./src/screens/Find";
import { Pool } from "./src/screens/Pool";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });
  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />
        {fontsLoaded ? <Pool /> : <Loading />}
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}
