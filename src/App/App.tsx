import { BrowserRouter, Routes, Route } from "react-router-dom";

import DetailRecipesPage from "./pages/DetailRecipesPage";
import RecipesPage from "./pages/RecipesPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RecipesPage />} />
          <Route path="/recipe">
            <Route path=":id" element={<DetailRecipesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
