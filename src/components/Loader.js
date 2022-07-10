import "./styles/Loader.css";
import { Spinner } from "reactstrap";
export default function Loader(props) {
  const { hide, color, type, size } = props;
  return (
    <div className="spinner-set" hidden={hide}>
      <Spinner color={color} type={type} size={size}>
        Loading...
      </Spinner>
    </div>
  );
}
