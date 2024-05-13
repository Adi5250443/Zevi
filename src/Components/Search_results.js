import React, { useState, useEffect } from "react";
import '../Styles/Search_result.css';
import logo from '../Styles/zevi_logo.png'
import { faker } from '@faker-js/faker';

function Search_results() {
    const [imageData, setImageData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        const data=generateProducts(15);
        setImageData(data);
        setFilteredData(data); 
    };

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

    const applyFilters = () => {
        let filteredProducts = imageData;

      
        if (selectedBrands.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedBrands.includes(product.company.toLowerCase())
            );
        }

       
        if (selectedPriceRanges.length > 0) {
            filteredProducts = filteredProducts.filter(product => {
                const productPrice = parseInt(product.price.slice(1));
                return selectedPriceRanges.some(range => {
                    const [minPrice, maxPrice] = range.split('-').map(Number);
                    return productPrice >= minPrice && productPrice <= maxPrice;
                });
            });
        }

      
        if (selectedRatings.length > 0) {
            filteredProducts = filteredProducts.filter(product =>
                selectedRatings.includes(product.rating)
            );
        }

        setFilteredData(filteredProducts);
    };

    useEffect(() => {
        applyFilters();
    }, [selectedBrands, selectedPriceRanges, selectedRatings]);

    const handleBrandCheckboxChange = (brand) => {
        const updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter(item => item !== brand)
            : [...selectedBrands, brand];
        setSelectedBrands(updatedBrands);
    };

    const handlePriceRangeCheckboxChange = (range) => {
        const updatedRanges = selectedPriceRanges.includes(range)
            ? selectedPriceRanges.filter(item => item !== range)
            : [...selectedPriceRanges, range];
        setSelectedPriceRanges(updatedRanges);
    };

    const handleRatingCheckboxChange = (rating) => {
        const updatedRatings = selectedRatings.includes(rating)
            ? selectedRatings.filter(item => item !== rating)
            : [...selectedRatings, rating];
        setSelectedRatings(updatedRatings);
    };

    return (

        <div className="Products-page">
       
            <div className="left-bar">
            <div className="logo1">
        <img src={logo} alt="not found"/>
        </div>
                <h3 style={{ textAlign:'center' }}>Filter</h3>

              
                <div className="filters">
                    <h4>Brand:</h4>
                    {imageData.map(item => (
                        <div key={item.company}>
                            <input
                                type="checkbox"
                                id={item.company}
                                checked={selectedBrands.includes(item.company.toLowerCase())}
                                onChange={() => handleBrandCheckboxChange(item.company.toLowerCase())}
                            />
                            <label htmlFor={item.company}>{item.company}</label>
                        </div>
                    ))}
                </div>

           
                <div className="filters">
                    <h4>Price Range:</h4>
                    <div>
                        <input
                            type="checkbox"
                            id="100-200"
                            checked={selectedPriceRanges.includes("100-200")}
                            onChange={() => handlePriceRangeCheckboxChange("100-200")}
                        />
                        <label htmlFor="100-200">$100 - $200</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="200-300"
                            checked={selectedPriceRanges.includes("200-300")}
                            onChange={() => handlePriceRangeCheckboxChange("200-300")}
                        />
                        <label htmlFor="200-300">$200 - $300</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="300-400"
                            checked={selectedPriceRanges.includes("300-400")}
                            onChange={() => handlePriceRangeCheckboxChange("300-400")}
                        />
                        <label htmlFor="300-400">$300 - $400</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="200-300"
                            checked={selectedPriceRanges.includes("400-500")}
                            onChange={() => handlePriceRangeCheckboxChange("400-500")}
                        />
                        <label htmlFor="400-500">$400 - $500</label>
                    </div>
                </div>

                <div className="filters">
                    <h4>Rating:</h4>
                    {[1, 2, 3, 4, 5].map(rating => (
                        <div key={rating}>
                            <input
                                type="checkbox"
                                id={`rating-${rating}`}
                                checked={selectedRatings.includes(rating)}
                                onChange={() => handleRatingCheckboxChange(rating)}
                            />
                            <label htmlFor={`rating-${rating}`}>{rating} stars</label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="products">
    {filteredData.length > 0 ? (
        filteredData.map((item, index) => (
            <div key={index} className="image-item">
                <div className="product-wrapper">
                    <img src={item.avatar} alt="Product" />
                    <div className="product-info">
                        <div className="product-name"><b>{item.productName}</b></div>
                        <div className="brand-name">{item.company}</div>
                        <div className="ratingprice">
                            <div className="price">Price: {item.price}</div>
                            <div className="rating">Rating: {item.rating}*</div>
                        </div>
                    </div>
                    <div className="overlay">
                        <button className="view-product-btn">View Product</button>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <div className="no-results">No matching products</div>
    )}
</div>
        </div>
    );
}

export default Search_results;
