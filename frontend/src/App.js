import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import AuthPage from "./components/AuthPage";
import GeneratePage from "./components/GeneratePage";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const helloWorldApi = async () => {
    try {
      const response = await axios.get(`${API}/`);
      console.log(response.data.message);
    } catch (e) {
      console.error(e, `errored out requesting / api`);
    }
  };

  useEffect(() => {
    helloWorldApi();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Layout Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create amazing layout plans for your projects with AI assistance
          </p>
          
          <div className="flex justify-center">
            <a
              className="App-link"
              href="https://emergent.sh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="https://avatars.githubusercontent.com/in/1201222?s=120&u=2686cf91179bbafbc7a71bfbc43004cf9ae1acea&v=4" 
                alt="Emergent"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
            </a>
          </div>
          
          <p className="text-gray-600 mt-4">
            Building something incredible ~!
          </p>
          
          <div className="mt-8">
            <a
              href="/generate"
              className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 inline-block"
            >
              Start Generating
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/generate" element={<GeneratePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
