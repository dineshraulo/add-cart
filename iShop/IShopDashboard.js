
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function IShopDashboard()
{
    const [cookies, setCookie, removeCookie] = useCookies();
    const [userid, setUserId] = useState();
    const [categories, setCategories] = useState([]);
    let navigate = useNavigate();

    function LoadCategories(){
        axios.get("http://localhost:4000/getcategories")
        .then(response=>{
            setCategories(response.data);
        })
    }

    useEffect(()=>{
        if(cookies["userid"]==undefined) {
            navigate("/login");
        } else {
            setUserId(cookies["userid"]);
            LoadCategories();
        }
    })

    function handleSignout(){
        removeCookie("userid");
        navigate("/login");
    }

    return(
        <div>
            <h2>User Dashboard {userid}  -  <button onClick={handleSignout} className="btn btn-link">Signout</button> </h2>
            <h3>Product Categories</h3>
            <ol>
                {
                    categories.map(item=>
                         <li key={item.category}> <Link to={"/products/" + item.category}>{item.category.toUpperCase()}</Link> </li>
                        )
                }
            </ol>
        </div>
    )
}