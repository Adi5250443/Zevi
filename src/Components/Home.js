import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../Styles/Home.css';
import logo from '../Styles/zevi_logo.png'
import { faker } from '@faker-js/faker';
import Search_results from "./Search_results";

function Home() {
    const [inputValue, setInputValue] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [issearchButtonClicked,setIsSearchButtonClicked]=useState(false);
    const [trending, setTrending] = useState([]);
    const [filteredTrending, setFilteredTrending] = useState([]);
    const [apiData,setApiData]=useState();
    const Navigate = useNavigate(); // Access the history object for navigation

    useEffect(() => {
        fetchTrendingData();
    }, []);

    const generateProducts = (count) => {
        const products = [];
        for (let i = 0; i < count; i++) {
          const isTrending = faker.datatype.boolean(); 
          const rating = faker.number.int({ min: 1, max: 5, precision: 0.1 });
          const product = {
            id:faker.string.uuid(),
            company:faker.company.name(),
            productName:faker.commerce.product('fashion'),
            price:faker.commerce.price({ min: 100, max: 500, dec: 0, symbol: '$' }),
            avatar:faker.image.urlLoremFlickr({ category: 'fashion' }),
            status: isTrending ? 'trending' : 'not trending',
            rating: parseFloat(rating.toFixed(1))
          };
          products.push(product);
        }
        return products;
      };

    const fetchTrendingData = () => {
        const data=generateProducts(15);
        setApiData(data);
        const trendingItems = data.filter(item => item.status === "trending");
                setTrending(trendingItems);
                setFilteredTrending(trendingItems); // Initialize filtered list with all trending items
                console.log('Trending Products:', trendingItems);

    };
   

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.length > 0) {
            setIsSearching(true);
        }
        // Filter trending items based on typed input
        const filteredItems = trending.filter(item =>
            item.productName.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredTrending(filteredItems);
    };

    const handleSearchButton = () => {
        setIsSearching(false);
        setIsSearchButtonClicked(true);
        // Navigate('/search-results');
    };

    return (
        <div className={` ${issearchButtonClicked? 'searching' : 'Header'}`}>
        <div className="logo">
            <img src={logo} alt="not found"/>
        </div>
            <div className="Search-bar">
                <input
                    type="text"
                    placeholder="Search item"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearchButton}><i className="fa fa-search"></i>Search</button>
            </div>

            {/* Render filtered trending items */}
            {isSearching && (
                <div className="trending">
                    <h3>Latest Trends</h3>
                    <div className="image-box">
                        {filteredTrending.length > 0 ? (
                            filteredTrending.map((item, index) => (
                                <div key={index} className="image-item">
                                    <img src={item.avatar} alt={`Trending ${index}`} />
                                    <div className="product-name">{item.productName}</div>
                                </div>
                            ))
                        ) : null}
                    </div>
                </div>
            )}
            {issearchButtonClicked &&(
             <Search_results data={apiData}/>
            )}
        </div>
    );
}

export default Home;
