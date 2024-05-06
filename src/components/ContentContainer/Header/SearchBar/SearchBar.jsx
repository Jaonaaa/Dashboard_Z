import React, { useEffect, useRef, useState } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { searchBarVariant } from "./variants";
import Hider from "../../../../utilsComponents/Hider/Hider";
import ListResult from "./ListResult/ListResult";
import "./SearchBar.sass";

const SearchBar = () => {
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [idTimeOut, setIdTimeOut] = useState(-1);
  const [data, setData] = useState([]);
  const input = useRef(null);

  const show = () => {
    setShowSearch(true);
  };

  const closeSearch = () => {
    setShowSearch(false);
  };

  const clearInput = () => {
    setSearchText("");
    setData([]);
  };

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    setFetching(true);
    setTimeout(() => {
      setData([...Array(Math.round(Math.random() * 30))]);
      setFetching(false);
    }, 1000);
  };

  const handleTyping = (e) => {
    clearTimeout(idTimeOut);
    const id = setTimeout(() => {
      handleSearch(e);
    }, 350);
    setIdTimeOut(id);
  };

  const handleInput = (e) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (input.current && showSearch) input.current.focus();
  }, [showSearch]);

  useEffect(() => {
    if (searchText.trim() !== "") handleTyping();
    else {
      clearTimeout(idTimeOut);
      clearInput();
    }
  }, [searchText]);

  return (
    <>
      <div className="search_bar_container" onClick={show}>
        <div className="placeholder">Search here...</div>
        <div className="icon">
          <IoSearchOutline />
        </div>
      </div>
      <AnimatePresence mode="wait">
        {showSearch && (
          <Hider onClick={closeSearch} classCss="glassy">
            <motion.div
              className="search_input_container"
              variants={searchBarVariant}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <form className="input" onSubmit={handleSearch}>
                <div className="left icon" tabIndex={0} onClick={handleSearch}>
                  <IoSearchOutline />
                </div>
                <input type="text" value={searchText} ref={input} onInput={handleInput} placeholder="What are you looking for ?" />
                <div className="right icon" tabIndex={0} onClick={clearInput}>
                  <IoCloseOutline />
                </div>
              </form>
              <div className="result_list">
                <ListResult data={data} loading={fetching} closer={closeSearch} />
              </div>
            </motion.div>
          </Hider>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchBar;
