import { Navigator } from "./src/navigation/navigator";
import { ThemeProvider } from "./src/utils/theme/theme.provider";
import { UserProvider } from "./src/utils/user/user.provider";

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Navigator />
      </UserProvider>
    </ThemeProvider>
  );
}
