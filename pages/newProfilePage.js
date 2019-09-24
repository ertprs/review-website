import React from 'react';
import Navbar from '../Components/MaterialComponents/Navbar';
import ProfilePageHeader from '../Components/ProfilePage/ProfilePageHeader';
import ProfilePageBody from '../Components/ProfilePage/ProfilePageBody';
class newProfilePage extends React.Component{

    render(){
        return (<>
        <Navbar />
        <ProfilePageHeader />
        <ProfilePageBody />
        </>)
    }
}

export default newProfilePage