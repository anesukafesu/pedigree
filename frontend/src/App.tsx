import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Index,
  Login,
  ForgotPassword,
  ResetPassword,
  EditBreed,
  EditCultivar,
  Suppliers,
  BreedRecommendation,
  CultivarRecommendation,
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Index} />
        <Route path="/breed-recommendation" Component={BreedRecommendation} />
        <Route
          path="/cultivar-recommendation"
          Component={CultivarRecommendation}
        />
        <Route path="/suppliers/login" Component={Login} />
        <Route path="/suppliers/forgot" Component={ForgotPassword} />
        <Route path="/suppliers/reset" Component={ResetPassword} />
        <Route path="/suppliers/" Component={Suppliers} />
        <Route path="/suppliers/edit-breed/:id" Component={EditBreed} />
        <Route path="/suppliers/edit-cultivar/:id" Component={EditCultivar} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
