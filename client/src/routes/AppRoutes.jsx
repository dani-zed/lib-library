import { BrowserRouter, Routes, Route } from "react-router-dom";
import Library from "../pages/Library";
import AddBook from "../pages/AddBook";
import EditBook from "../pages/EditBook";
import NotFound from "../pages/NotFound";
import BookPage from "../pages/BookPage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import ProfilePage from "../pages/ProfilePage";
import MyLibrary from "../pages/MyLibrary";
import { MusicProvider } from "../context/MusicContext";
import ReadingPage from "../pages/ReadingPage";
import MainLayout from "../layout/MainLayout";

const AppRoutes = () => {
  return (
    <MusicProvider>
      <BrowserRouter>
       <Routes>
  {/* Immersive Reading Page */}
  <Route path="/read/:id" element={<ReadingPage />} />

  {/* Main Layout */}
  <Route element={<MainLayout />}>
    <Route path="/" element={<Library />} />
    <Route path="/add" element={<AddBook />} />
    <Route path="/edit/:id" element={<EditBook />} />
    <Route path="/book/:id" element={<BookPage />} />
    <Route path="/my-library" element={<MyLibrary />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="*" element={<NotFound />} />
  </Route>
</Routes>
      </BrowserRouter>
    </MusicProvider>
  );
};

export default AppRoutes;