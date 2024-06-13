import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import Routing from "./routes";
import { SocketContext, socket } from "./context/socket";
import FormProvider from "./context/FormProvider";




const initialToast = {
  hideProgressBar: true,
  closeOnClick: true,
  rtl: false,
  newestOnTop: false,
  draggable: true,
  pauseOnHover: true
}

const App = () => {

  const [value, setValue] = useState({
    question: "",
    answer: ""
  });

  useEffect(() => {
    socket.emit("join", '1234');
  }, [])

  return (
    <SocketContext.Provider value={socket} >
      <FormProvider>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <BrowserRouter>
              <ToastContainer {...{ initialToast }} />
              <Routing />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </FormProvider>
    </SocketContext.Provider>
  );
};

export default App;
