
import { Link } from 'react-router-dom'
import Logout from './Logout'
function SideBar() {
    return <div className='sidebar'>
        <div><Link to="/"><h6>Home</h6></Link></div>
        <div><Link to="/inventory"><h6>Inventory</h6></Link></div>
        <div><Link to="/accounts"><h6>Accounts</h6></Link></div>
        <div><Link to="/customers"><h6>Customers</h6></Link></div>
        <div><Link to="/employees"><h6>Employees</h6></Link></div>
        <div><Link to="/reports"><h6>Reports</h6></Link></div>
        <div><Link to="/appointments"><h6>Appointments</h6></Link></div>
        <div><Logout /></div>

    </div>
}
export default SideBar