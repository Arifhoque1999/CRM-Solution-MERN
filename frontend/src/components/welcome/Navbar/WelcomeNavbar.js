
import profile from '../../../images/user.png'
function WelcomeNav() {

    const getName = () => {
        const userDetails = JSON.parse(localStorage.getItem("user"))
        return userDetails.name
    }
    return <>
        <nav style={{"position": "fixed"}}>
            <div className="nav-wrapper white">
                <h5 to="" className="brand-logo left">Custome</h5>
                <ul id="nav-mobile" className="right">
                    <li id="sign-in" style={{ width: "150px" }}>
                        <img src={profile} alt="profile" /><span className='username'>{getName()}</span>
                    </li>
                </ul>
            </div>
        </nav>
    </>
}
export default WelcomeNav