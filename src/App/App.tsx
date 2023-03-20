import { Routes, Route, HashRouter } from "react-router-dom";

import DetailRecipesPage from "./pages/DetailRecipesPage";
import RecipesPage from "./pages/RecipesPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RecipesPage />} />
        <Route path="/recipe">
          <Route path=":id" element={<DetailRecipesPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
