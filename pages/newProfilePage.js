import React from 'react';
import Navbar from '../Components/MaterialComponents/NavBar';
import ProfilePageHeader from '../Components/ProfilePage/ProfilePageHeader';
import ProfilePageBody from '../Components/ProfilePage/ProfilePageBody';
import Footer from '../Components/Footer/Footer';
class newProfilePage extends React.Component {

    render() {
        return (<>
            <Navbar />
            <ProfilePageHeader />
            <ProfilePageBody />
            <Footer />
        </>)
    }
}

export default newProfilePage