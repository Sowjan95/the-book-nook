
import React from "react";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import PostsListPage from "./pages/PostsListPage";
import PostFormPage from "./pages/PostFormPage";
import ShowPostPage from "./pages/ShowPostPage";
import AboutUsPage from "./pages/AboutUsPage";
import UserProfile from "./pages/UserProfilePage";
import HomePage from "./pages/HomePage"
import MyBooksPage from "./pages/MyBooksPage"
import ShowBookPage from "./pages/ShowBookPage";
import CommunityPage from "./pages/CommunityPage";
import AddMyBookForm from "./pages/AddMyBookForm";

import "bootstrap/dist/css/bootstrap.min.css"

import "./App.css";

function Navigation(props) {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          theBookNook
        </Link>
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/posts/new">
              Create a Micro Post
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/about-us">
              About Us
            </NavLink>
          </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/log-in">
                Log In
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/user-profile">
                Profile
              </NavLink>
            </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/mybooks">
              My Books
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/community">
              Community
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <div className="container-xl text-center">
          <div className="row justify-content-center">
            <Routes>
              <Route path="/log-in" element={<LoginPage />} />
              <Route path="/posts/new" element={<PostFormPage />} />
              <Route path="/my_book/new" element={<AddMyBookForm />} />
              <Route path="/posts/:id" element={<ShowPostPage />} />
              <Route path="/book/:id" element={<ShowBookPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              <Route path="/" element={<PostsListPage />} />
              <Route path="/user-profile" element={<UserProfile />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/mybooks" element={<MyBooksPage />} />
              <Route path="/community" element={<CommunityPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AuthProvider>
    
  );
}

export default App;