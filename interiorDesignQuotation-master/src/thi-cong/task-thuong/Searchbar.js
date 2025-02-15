import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import axios from 'axios';
import "./search.css";

export const Searchbar = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (searchText || showDropdown) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  }, [searchText, showDropdown]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://localhost:7224/api/UrlPath/GetUrlByTitle?title=${searchText}`);
      setSearchResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleSelect = (url) => {
    setShowDropdown(false);
    setSearchText("");
    // Do something with the selected URL, such as redirecting or displaying more details
    console.log("Selected URL:", url);
  };

  return (
    <div className="search">
      <form className="d-flex align-items-center" id="searchArea" role="search" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
        <input
          className="form-control"
          id="searchForm"
          type="search"
          placeholder="Tìm Kiếm...."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          className="btn btn-outline-success"
          id="searchFormBtn"
          type="submit" 
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>

      {showDropdown && searchText && (
        <div className='search-results-wrapper'>
          <div className="wd-dropdown-results wd-scroll wd-dropdown">
            {searchResults.map((result) => (
              <div class="wd-scroll-content" key={result.urlId} onClick={() => handleSelect(result.url)}>
                <Link style={{ textDecoration: 'none' }} to={result.url}>
                  <div className='link-contents'>
                    <div><img className='cont-img' src={result.imgurl} alt=""/></div>
                    <div className='text-item'><h6>{result.title}</h6></div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
