import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/publicLayout/PublicLayout";
import Home from "./pages/home/Home";

function App() {
  return (
    <div>
      <main>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;