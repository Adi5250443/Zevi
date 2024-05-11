import {React,useState} from "react";
import '../Styles/Home.css'
import logo from '../Styles/zevi_logo.png'

function Home() {

    const [isClicked,setIsClicked]=useState(false);

    const handleInputChange=(event)=>{

        let val=event.target.value;
        console.log(val);
    }


    return (
        <>
            <div className="Header">

                <div className="logo">
                    <img src={logo} />
                </div>

                <div class="Search-bar">
                    <input type="text" placeholder="Search item" onChange={handleInputChange}></input>
                    <button><i class="fa fa-search"></i></button>
                </div>


            </div>

        </>
    )
}


export default Home;