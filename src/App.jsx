// @ts-nocheck
import { useState } from "react";
import { Provider } from "react-redux";
import "./App.scss";
// react router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import {
  Home,
  CategoryProduct,
  ProductSingle,
  Cart,
  Search,
} from "./pages/index";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Sidebar />

          <Routes>
            <Route path="/" element={ <Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
