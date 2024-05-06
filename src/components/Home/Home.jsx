import React from "react";
import Banner from "./Banner/Banner";
import ActuSwiper from "./ActuSwiper/ActuSwiper";
import { motion } from "framer-motion";
import { variantContainerStag } from "../../utilsComponents/Variants";
import PerspectiveBox from "./PerspectiveBox/PerspectiveBox";
import ContentContainer from "../ContentContainer/ContentContainer";
import Input from "../../utilsComponents/Input/Input";
import useForm from "../../hooks/useForm";
import { alaivoGet, alaivoPost } from "../../utils/Alaivo";
import "./Home.sass";

const Home = () => {
  const { formData, handleInputForm } = useForm();
  const submit = async (e) => {
    e.preventDefault();
    // formData.time = formData.time.replace("T", " ");
    console.log(formData);
    let res = await alaivoPost("test/time", JSON.stringify(formData));
    console.log(res);
  };
  const get = async (e) => {
    let res = await alaivoGet("test/time");
    console.log(res);
  };
  return (
    <>
      <ContentContainer>
        <div className="inner">
          <motion.div variants={variantContainerStag} initial="initial" animate="animate" className="container_home_main">
            <motion.div className="row" variants={variantContainerStag}>
              <Banner />
              <ActuSwiper />
            </motion.div>
            <motion.div
              className="row grid_row"
              variants={variantContainerStag}
              style={{ minHeight: "fit-content", justifyContent: "center" }}
            >
              <PerspectiveBox />
              <PerspectiveBox bubbleBg="#9acbe4" />
              <PerspectiveBox bubbleBg="#9acbe4" />
              <PerspectiveBox bubbleBg="#9acbe4" />
              <form onSubmit={submit}>
                <Input type="datetime-local" name="time" title="Times" onChange={handleInputForm} />
                <button> Send</button>
              </form>
              <button onClick={get}>Get</button>
            </motion.div>
          </motion.div>
        </div>
      </ContentContainer>
    </>
  );
};

export default Home;
