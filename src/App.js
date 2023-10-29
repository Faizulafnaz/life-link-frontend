import './App.css';
import { Route, Router, Routes} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import PrivateRoute from './utils/PrivateRoute';
import Register from './pages/Register';
import Otp from './pages/Otp';
import DM from './pages/DM';
import ProfileModal from './components/ProfileModal/ProfileModal';
import ServerModal from './components/ServerModal/ServerModal';
import { SearcModal } from './components/SearchModal/SearcModal';


function App() {
  return (
    <div>
       <Routes>
            <Route  path="/" element={<DM />} exact />
            <Route  path="/dm/" element={<DM />} exact />
            <Route  path="/dm/:username" element={<DM />} />
            <Route  path="/group/:group" element={<Home />} />
            <Route  path="/group/:group/:channel" element={<Home />} />
            <Route  path="/group/:group/room/:RoomId" element={<Home />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/varify" element={<Otp/>} />
       </Routes>

       <ProfileModal />
       <ServerModal />
       <SearcModal />
    </div>
  );
}

export default App;
