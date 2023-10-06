

function MainContent() {
    const getName = () => {
        const userDetails = JSON.parse(localStorage.getItem("user"))
        return userDetails.name
    }
    return <div className="LinkWithCreateOrder">

        <div>
            <div className="create-button">
                <div><h5> Hello <span className='username'>{getName()}</span>, WelCome to CRM Solution </h5></div>
            </div>
        </div>
    </div>
}
export default MainContent