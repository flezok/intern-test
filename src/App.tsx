import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import FormRegistration from "./components/form/formRegistration/formRegistration";
import FormAuthorization from "./components/form/formAuthorization/formAuthorization";

export default function App() {

  

  return (
    <MantineProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<FormRegistration/>}/>
          <Route path='/authorization' element={<FormAuthorization/>}/>
        </Routes>
      </Router>
          
    </MantineProvider>
  )
  
}
