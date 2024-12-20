import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage, LearningPathPage, QuizPage } from "./pages";
import { Root } from "./layouts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "search-result",
        element: <LearningPathPage />,
      },
      {
        path: "quiz",
        element: <QuizPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
