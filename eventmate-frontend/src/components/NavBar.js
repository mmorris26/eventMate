import { Link, useNavigate } from 'react-router-dom'
import { removeToken, tokenExp } from '../tokenLogic/tokenLogic'
import { useState } from 'react'

export default function NavBar() {
  const navigate = useNavigate()

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Function to clear the token from local storage and navigate the user back to the homepage
  function logOut() {
    removeToken()
    navigate('/')
  }

  function autoclose(e) {
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
      setSidebarOpen(false)
    }
  }

  return (
    <>
      <nav onClick={autoclose} className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="close-sidebar" onClick={() => setSidebarOpen(false)}>X</div>
        {tokenExp() &&
          <>
            <div className='sidebar-links-container'>
              <Link to='/ProfilePage' className='nav-link'>My Profile</Link>
              <div>
                <Link to='/CreateEventPage' className='nav-link normal-btn create-btn'>Create Event</Link>
              </div>
            </div>
            <button onClick={logOut} className='danger-btn'> LOG OUT </button>
          </>
        }
        {!tokenExp() &&
          <div className='sidebar-links-container'>
            <Link to='/Login' className='nav-link'>Login</Link>
            <Link to='/SignUp' className='nav-link'>Sign Up</Link>
          </div>
        }
      </nav>
      <div className='navbar'>
        <nav className='navbar-content'>
          <img class="hamburger" onClick={() => setSidebarOpen(true)} src="/media/menu.svg" />
          <div id="logo"><Link to='/'>eventMate</Link></div>
          <div className='nav-links-container'>
            {/* Checks if the token is in local storage and is not expired. If it is then shows this part of the nav bar if it is not it shows the other section of the nav bar. */}
            {tokenExp() &&
              <div>
                <Link to='/CreateEventPage' className='nav-link create-btn normal-btn'>Create Event</Link>
                <Link to='/ProfilePage' className='nav-link'>My Profile</Link>
                <button onClick={logOut} className='danger-btn'> LOG OUT </button>
              </div>
            }
            {!tokenExp() &&
              <div>
                <Link to='/Login' className='nav-link'>Login</Link>
                <Link to='/SignUp' className='nav-link'>Sign Up</Link>
              </div>
            }
          </div>
        </nav>
        <hr />
      </div>
    </>
  )
}

