import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "./PaginationSlider.sass";

const PaginationSlider = ({
  loading,
  callBackPagination = (index) => {},
  pageCount = 10,
  activePage = 0,
  setActivePage = () => {},
}) => {
  const [spacedLeft, setSpacedLeft] = useState(false);
  const [spacedRight, setSpacedRight] = useState(false);
  const [nextOn, setNextOn] = useState(false);
  const [prevOn, setPrevOn] = useState(false);

  const [leftRow, setLeftRow] = useState([]);
  const [rightRow, setRightRow] = useState([]);
  const [middleRow, setMiddleRow] = useState([]);

  const [index, setIndex] = useState(0);
  const limitLeft = 2; // le avaty am gauche
  const limitMiddle = 5; // mid
  const limitRight = 2; // le avaty am droite le apres point
  const countToShow = 9; // ny isan le mipotra

  const handleSpaced = () => {
    let fill = 0;
    clear();
    handleArrowButton();
    if (pageCount < countToShow) clearSpace();
    else {
      fill += handleft();
      handleRight(fill);
    }
  };

  const handleArrowButton = () => {
    if (index === 0) setPrevOn(false);
    else setPrevOn(true);

    if (index === pageCount - 1) setNextOn(false);
    else setNextOn(true);
  };

  const handleft = () => {
    let limit = limitLeft;
    if (index < limit + limitMiddle && index - limitLeft <= limitLeft) {
      limit = index + limitMiddle - limitRight;
      if (limit < limitLeft + limitMiddle) {
        limit = limitLeft + limitMiddle;
      }
    } else {
      setSpacedLeft(true);
    }
    let data = [];
    for (let i = 0; i < limit; i++) {
      data.push(i);
    }
    setLeftRow(data);
    return data.length;
  };

  const handleRight = (fill = 0) => {
    let limit = limitMiddle;
    let data = [];

    if (fill > limitLeft) {
      for (let i = pageCount - limitRight; i < pageCount; i++) {
        data.push(i);
      }
      setSpacedRight(true);
      setRightRow(data);
    } else {
      if (index + limitRight + limit - limitLeft >= pageCount) {
        for (let i = pageCount - limitRight - limitMiddle; i < pageCount; i++) {
          data.push(i);
        }
        setRightRow(data);
      } else {
        let from = index - 2;
        for (let i = from; i < from + limitMiddle; i++) {
          data.push(i);
        }
        setMiddleRow(data);
        setSpacedRight(true);
        let dataRight = [];
        for (let i = pageCount - limitRight; i < pageCount; i++) {
          dataRight.push(i);
        }
        setRightRow(dataRight);
      }
    }
  };

  const clearSpace = () => {
    setSpacedLeft(false);
    setSpacedRight(false);
    setLeftRow([...Array(pageCount).keys()]);
    setMiddleRow([]);
    setRightRow([]);
  };

  const clear = () => {
    setSpacedLeft(false);
    setSpacedRight(false);
    setLeftRow([]);
    setMiddleRow([]);
    setRightRow([]);
  };

  const next = () => {
    if (index + 1 < pageCount) {
      setIndex(index + 1);
      callBackPagination(index + 1);
    }
  };

  const before = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1);
      callBackPagination(index - 1);
    }
  };

  useEffect(() => {
    handleArrowButton();
    handleSpaced();
    if (activePage === index) callBackPagination(index);
    setActivePage(index);
  }, [index]);

  const Blocks = ({ indexes }) => {
    return (
      <>
        {indexes.map((row) => (
          <div
            key={row}
            className={`block_index ${index === row ? "active_page" : ""}`}
            onClick={() => {
              setIndex(row);
              callBackPagination(row);
            }}
          >
            {row + 1}
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="pagination_container">
      {prevOn && (
        <div className="left" onClick={before}>
          <IoIosArrowBack className="back" />
        </div>
      )}
      <div className="pages_index">
        <Blocks indexes={leftRow} />
        {spacedLeft && <div className="spaces">...</div>}
        <Blocks indexes={middleRow} />
        {spacedRight && <div className="spaces">...</div>}
        <Blocks indexes={rightRow} />
      </div>
      {nextOn && (
        <div className="right" onClick={next}>
          <IoIosArrowForward className="forward" />
        </div>
      )}
    </div>
  );
};

export default PaginationSlider;
