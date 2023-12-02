// main.jsx -- 路由器

// 库
import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

// 页面
import HomepageRoot from "./HomepageRoot.jsx"
import Homepage from "./pages/homepage.jsx"
import Comments from "./pages/comments.jsx"
import About from "./pages/about.jsx"


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomepageRoot />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "comments",
        element: <Comments />,
      },
      {
        path: "about",
        element: <About />,
      }
    ]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
