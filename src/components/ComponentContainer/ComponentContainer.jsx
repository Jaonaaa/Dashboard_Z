import React, { useEffect, useState } from "react";
import { useMyNotifs } from "../../utilsComponents/Notif/useNotifs";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import Modal from "../../utilsComponents/Modal/Modal";
import Select from "../../utilsComponents/Select/Select";
import Input from "../../utilsComponents/Input/Input";
import SwitcherTheme from "./Switcher/SwitcherTheme";
import ValidationModal from "../../utilsComponents/Modal/Validation/ValidationModal";
import { variantItem, variantContainerStag } from "../../utilsComponents/Variants";
import BoxTitle from "../../utilsComponents/Box/BoxTitle/BoxTitle";
import Loader from "../../utilsComponents/Hider/Loader/Loader";
import useForm from "../../hooks/useForm";
import "./ComponentContainer.sass";
import RangeInput from "../../utilsComponents/Input/Range/Range";

const ComponentContainer = () => {
  const { formData, handleInputForm } = useForm();
  const [openModal, setOpenModal] = useState(false);
  const [openModalValidation, setOpenModalValidation] = useState(false);
  const { showRandomNotif, notifs } = useMyNotifs();

  const [options] = useState([
    { label: "Example 1 ", value: "example_1" },
    { label: "Example 2 ", value: "example_2" },
    { label: "Example 3", value: "example_3" },
  ]);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleModalValidation = () => {
    setOpenModalValidation(!openModalValidation);
  };

  useEffect(() => {
    // console.log(formData);
  }, [formData]);

  return (
    <motion.div className="container_components" variants={variantContainerStag}>
      {/* MODAL */}
      <motion.div className="component_box" variants={variantItem}>
        <button onClick={handleModal}> Open Modal </button>
        <AnimatePresence>
          {openModal && (
            <Modal closer={handleModal}>
              <BoxTitle title={"Modal Test  (～￣▽￣)～"}>
                <Input title={"Send some text"} fullWidth defaultValue="Hello, world!" type="textarea" onChange={handleInputForm} />
              </BoxTitle>
            </Modal>
          )}
        </AnimatePresence>
        <div className="title_compo">Modal</div>
      </motion.div>
      {/* NOTIFICATIONS */}
      <motion.div className="component_box" variants={variantItem}>
        <button onClick={showRandomNotif}> Add notifs</button>
        {notifs.map((notif) => notif)}
        <div className="title_compo">Notifications</div>
      </motion.div>
      {/* INPUT */}
      <motion.div className="component_box" variants={variantItem}>
        <Input onChange={handleInputForm} type="text" title={"Title"} name="input_text" />
        <div className="title_compo">Input </div>
      </motion.div>
      {/* INPUT */}
      <motion.div className="component_box" variants={variantItem}>
        <Input onChange={handleInputForm} type="file" title={"Fichier"} name="file" />
        <div className="title_compo">Input </div>
      </motion.div>
      {/* INPUT */}
      <motion.div className="component_box" variants={variantItem}>
        <Input onChange={handleInputForm} type="checkbox" title={"Title"} name="checkbox" />
        <div className="title_compo">Input checkbox</div>
      </motion.div>
      {/* INPUT */}
      <motion.div className="component_box" variants={variantItem}>
        <RangeInput callback={() => {}} min={50} />
        <div className="title_compo">Input Range</div>
      </motion.div>
      {/* LOADER */}
      <motion.div className="component_box" variants={variantItem}>
        <Loader />
        <div className="title_compo">Loader</div>
      </motion.div>
      {/* DROPDOWN */}
      <motion.div className="component_box" variants={variantItem}>
        <Select onChange={handleInputForm} defaultValue={options[2]} name={"select_simple"} optionsType={options} />
        <div className="title_compo">Dropdown</div>
      </motion.div>
      {/* DROPDOWN */}
      <motion.div className="component_box" variants={variantItem}>
        <Select
          onChange={handleInputForm}
          multiple
          name={"select"}
          optionsType={options}
          defaultValue={[2, 0]}
          placeholder="Examples"
        />
        <div className="title_compo">Dropdown ( mutiple )</div>
      </motion.div>
      {/* METHOD AND THEMES SWITCHER */}
      <motion.div className="component_box" variants={variantItem}>
        <div className="title_compo">Themes</div>
        <SwitcherTheme />
      </motion.div>
      {/* VALIDATION MODAL */}
      <motion.div className="component_box" variants={variantItem}>
        <div className="title_compo">Validation Box</div>
        <button onClick={handleModalValidation}> Confirm </button>
        <AnimatePresence>
          {openModalValidation && (
            <ValidationModal
              icon={""}
              callBack={handleModalValidation}
              title="Example Modal validation"
              content="
              Lorem ipsum dolor sit amet consectetur, adipisicing elit e. 
              Ipsum rerum voluptates nihil ullam non
              doloribus quia laudantium voluptatibus."
              validationText={"Valider"}
              cancelOn={false}
              closer={handleModalValidation}
            />
          )}
        </AnimatePresence>
      </motion.div>
      {/* //// */}
    </motion.div>
  );
};

export default ComponentContainer;
