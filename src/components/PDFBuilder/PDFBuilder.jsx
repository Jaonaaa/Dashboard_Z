import React, { useRef, useState } from "react";
import { Document, Page, Text, View, PDFViewer, PDFDownloadLink, Font, Image } from "@react-pdf/renderer";
import { dataDefault } from "../../utilsComponents/Table/Table";
import Loader from "../../utilsComponents/Hider/Loader/Loader";
import Modal from "../../utilsComponents/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import Poppins from "../../assets/fonts/Poppins-Light.ttf";
import SoraSM from "../../assets/fonts/Sora-SemiBold.ttf";
import img from "../../assets/img/brume.jpg";
import { styles } from "./style";
import CustomChart from "../../utilsComponents/Chart/CustomChart";
import { example2 } from "../Graphs/Graphs";
import { getImage } from "../../utils/Image";

Font.register({ family: "Poppins", fonts: [{ src: Poppins }, { src: SoraSM, fontWeight: "bold" }] });

// Create styles

const PDFBuilder = () => {
  const [showPDF, setShowPDF] = useState(true);
  const g = useRef(null);
  const [picture, setPicture] = useState(null);
  const handlePdfView = () => {
    setShowPDF(!showPDF);
  };

  const addPicture = async () => {
    let res = await getImage(g.current);
    setPicture(res);
  };

  return (
    <div className="inner">
      <PDFDownloadLink document={<MyDocument img={picture} />} fileName="test.pdf">
        {({ blob, url, loading, error }) => (loading ? <Loader /> : <button>Download now</button>)}
      </PDFDownloadLink>
      <button onClick={handlePdfView}> Open PDF Viewer </button>
      <button onClick={addPicture}> Add picture </button>

      <div className="container_block" ref={g}>
        <CustomChart
          title="Second Chart"
          labels={example2.labels}
          datasets={example2.datasets}
          type="doughnut"
          positionTitle="bottom"
        />
      </div>

      <AnimatePresence>
        {showPDF && (
          <Modal closer={handlePdfView}>
            <div className="container_pdf" style={{ height: "85vh", width: "35rem" }}>
              <PDFViewer style={{ width: "100%", height: "93%", backgroundColor: "transparent" }} showToolbar={false}>
                <MyDocument img={picture} />
              </PDFViewer>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
};

// Create Document Component
const MyDocument = ({ img }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{ width: "60%", margin: "20px auto " }}>{img ? <Image src={img} /> : null}</View>
      <TablePdf {...dataDefault} />
      <TablePdf {...dataDefault} />
      <TablePdf {...dataDefault} />
      <TablePdf {...dataDefault} />
    </Page>
  </Document>
);

const TablePdf = ({ body = [], index = [], titles = [] }) => {
  const lengths = getColumnLength(index, titles, body);
  const rowValues = getValues(index, body);
  return (
    <View style={styles.section}>
      <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {titles.map((t, i) => (
          <Text
            key={i}
            style={{
              width: lengths[i],
              fontWeight: "bold",
              padding: "10px 12px 10px 4px",
            }}
          >
            {t}
          </Text>
        ))}
      </View>
      <View style={{ borderBottom: "0.9px solid #000", width: "100%" }} />
      {rowValues.map((row, i) => (
        <View
          key={i}
          style={{
            display: "flex",
            backgroundColor: i % 2 === 0 ? "#f0f7f8" : "",
            flexDirection: "row",
            width: "100%",
            borderBottom: "0.2px solid #f0f7f8",
          }}
        >
          {row.map((text, j) => {
            return (
              <Text
                key={j}
                style={{
                  width: lengths[j],
                  color: "#232222",
                  padding: "10px 12px 10px 4px",
                }}
              >
                {text}
              </Text>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const getColumnLength = (index = [], titles = [], body = [], fontSize = 10) => {
  const lengths = titles.map((t) => 0);

  for (let i = 0; i < titles.length; i++) {
    let length = titles[i].length * fontSize;
    checkIfHigher(lengths, i, length);
  }

  let rowValues = getValues(index, body);
  for (let i = 0; i < rowValues.length; i++) {
    for (let o = 0; o < rowValues[i].length; o++) {
      let text = rowValues[i][o];
      let length = (text + "").length * fontSize;
      checkIfHigher(lengths, o, length);
    }
  }

  return lengths;
};

const getValues = (index = [], body = []) => {
  let rows = [];
  for (let u = 0; u < body.length; u++) {
    let row = body[u];
    let values = [];
    for (let i = 0; i < index.length; i++) {
      let text = row[i];
      if (Array.isArray(index[i])) {
        text = row;
        for (let o = 0; o < index[i].length; o++) {
          text = text[index[i][o]];
        }
      }
      values.push(text);
    }
    rows.push(values);
  }
  return rows;
};

const checkIfHigher = (tab = [], index, newValue) => {
  if (tab[index] < newValue) {
    tab[index] = newValue;
  }
};
export default PDFBuilder;
