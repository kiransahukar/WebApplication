import React from 'react';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { HomeLayouts } from './HomeLayouts';
import {Provider} from 'react-redux';
import {store} from './store.jsx';
import Filter from './components/Filter/Filter.jsx';
import Login from './pages/Login/Login.jsx';
import Logout from './pages/Login/Logout.jsx';
import { ToastContainer } from 'react-toastify';
import Notes from './components/Notes/Notes.jsx';



function App() {

  

  return (
    <div >
    <Provider store={store}>
      
      <Router>
        {/* <Navbar /> */}
        
        <Routes>
        {/* <Route path="/adminlayout" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="/adminlayout/adminitems" element={<AdminItems />} />
          <Route path="/adminlayout/adminusers" element={<AdminUsers />} />
          <Route path="/adminlayout/adminaccount" element={<AdminAccount />} />
        </Route> */}
          <Route path="/" element={<HomeLayouts />}>
            <Route index element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/notes" element={<Notes />}/>
            <Route path="/filter" element={<Filter />}/>
          </Route>
          <Route path="/login" element={<Login />}/>
          <Route path="/logout" element={<Logout />}/>

          {/* <Route path="/profile" element={<Profile />}/>
          <Route path="/notification" element={<Dashboard />}/>
          <Route path="/loginlogout" element={<Index />}/> */}
        </Routes>
        <ToastContainer />
      </Router>
      </Provider>
    </div>
  );
}

export default App;
