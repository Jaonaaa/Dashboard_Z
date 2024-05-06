import "./Loader.sass";

// interface LoaderProps {
//   size?: string;
//   weigth?: string;
//   white?: boolean;
// }
const Loader = ({ size = "4rem", weigth = "0.175rem", white = false }) => {
  return (
    <div className={`loader_load ${white ? "white__" : "loader_icon"}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
        <circle cx="50" cy="50" r={30} fill="none" style={{ strokeWidth: weigth }} />
      </svg>
    </div>
  );
};

export default Loader;
