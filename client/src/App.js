import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Calendar from "./pages/Calendar";
import Day from "./pages/Day";
import Login from "./pages/Login";
import Task from "./pages/Task";

function App() {

    return (
        <div className="app">

            <nav className="nav">
                <h3></h3>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/calendar">Calendar</Link>
                    </li>
                    <li>
                        <Link to="/login">Log in</Link>
                    </li>
                </ul>
            </nav>

            <div className='app__body'>

                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/calendar' element={<Calendar/>}/>
                    <Route path='/day/:date' element={<Day/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/task/:id' element={<Task/>}/>
                </Routes>
            </div>

        </div>
    );
}

export default App;