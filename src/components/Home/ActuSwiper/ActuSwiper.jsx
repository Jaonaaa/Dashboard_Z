import React, { useState } from "react";
import Bg from "../../../assets/img/brume.jpg";
import ArrowRight from "../../../assets/svg/ArrowRight";
import LineSlide from "../../../utilsComponents/Container/LineSlide/LineSlide";
import "./ActuSwiper.sass";

const ActuSwiper = () => {
  const [content, setContent] = useState([1, 2, 1, 4, 4, 4, 4]);
  const [percent, setPercent] = useState(0);

  const next = () => {
    const next = percent + 100;
    if (next >= 100 * content.length) return;
    setPercent(next);
  };

  const back = () => {
    const back = percent - 100;
    if (back < 0) return;
    setPercent(percent - 100);
  };

  return (
    <div className="actu_swiper_container">
      <div className="counter_part">
        {content.map((c, key) => (
          <div
            className={`round ${key === percent / 100 ? "on" : ""}`}
            onClick={() => {
              setPercent(key * 100);
            }}
            key={key}
          ></div>
        ))}
      </div>
      <div className="switcher_part">
        <div className="go_left" onClick={back}>
          <ArrowRight />
        </div>
        <div className="go_right" onClick={next}>
          <ArrowRight />
        </div>
      </div>
      {content.map((c, key) => (
        <div className="block_actu" key={key} style={{ transform: `translateX(-${percent}%)` }}>
          <div className="actu_pic">
            <img src={Bg} />
          </div>
          <div className="about">
            <LineSlide>
              <div className="categorie">FEATURED APP</div>
            </LineSlide>
            <LineSlide>
              <div className="title_about">Lorem, ipsum dolor sit amet consectetur</div>
            </LineSlide>
            <LineSlide>
              <div className="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis et vero quibusdam explicabo ab
                consectetur facilis. Soluta impedit nostrum libero, commodi quo voluptatem porro fugiat! Assumenda asperiores
                saepe facere maxime.
              </div>
            </LineSlide>
          </div>
          <div className="overlay"></div>
        </div>
      ))}
    </div>
  );
};

export default ActuSwiper;
