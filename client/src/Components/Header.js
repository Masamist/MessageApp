
// styles
import './Header.css'

const Header = () => {
  return (
    <nav className='nav'>
      <div className='nav-container'>
        <div>
          <h2 className='title'>Message App</h2>
        </div>
        <div>
            <button className='btn btn-login'>Login</button>
        </div>
      </div> 
    </nav>
    
  )
}

export default Header