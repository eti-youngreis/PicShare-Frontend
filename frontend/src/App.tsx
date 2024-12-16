import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import InitializedAuth from "./auth/InitializedAuth";
import Init from "./init/Init";
import React from "react";


function App() {
  return (
    <div dir="rtl">
      <Provider store={store}>
        <Init>
          <RouterProvider router={router} />
        </Init>
      </Provider>
    </div>
  );
}

export default App;
