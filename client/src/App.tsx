import { useEffect } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Chat from "./components/pages/chat";
import Login from "./components/pages/login";
import SignupWrapper from "./components/pages/signupWrapper";
import LoginLayout from "./components/routes/LoginLayout";
import ProtectedLayout from "./components/routes/ProtectedLayout";
import { LOCAL_STORAGE } from "./components/storageConfig";
import { getFromLocalStorage } from "./components/utils";
import { setUser } from "./redux/actionCreators/authActionCreators";
import store from "./redux/store";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  useEffect(() => {
    const user = getFromLocalStorage(LOCAL_STORAGE.USER_DETAILS);
    if (user) {
      store.dispatch(setUser(user));
    }
  }, []);

  return (
    <div className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<LoginLayout />}>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignupWrapper />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedLayout />}>
              <Route path="/chat" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </Provider>
    </div>
  );
};

export default App;
