import { ThemeProvider, CSSReset, Box } from "@chakra-ui/core";
import { customTheme } from "./theme";
import Header from "./components/Header";
import CalculatorForm from "./components/CalculatorForm";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Box maxW="960px" mx="auto">
        <Header/>
      </Box>
    </ThemeProvider>
  );
}

export default App;
