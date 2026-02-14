// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Library from "../pages/Library";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import NotFound from "../pages/NotFound";
import BookPage from "../pages/BookPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProfilePage from "../pages/ProfilePage";
import MyLibrary from "../pages/MyLibrary";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Wrap all pages inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Library />} />
          <Route path="add" element={<AddBook />} />
          <Route path="edit/:id" element={<EditBook />} />
            <Route path="book/:id" element={<BookPage />} />
            <Route path="my-library" element={<MyLibrary/>} />
            <Route path="login" element={<Login />} />
            <Route path="Signup" element={<Signup />} />
            <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;