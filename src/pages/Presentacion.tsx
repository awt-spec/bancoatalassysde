import PresentationApp from "@/presentation/PresentationApp";
import { useNavigate } from "react-router-dom";

const Presentacion = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen overflow-hidden">
      <PresentationApp onClose={() => navigate("/")} />
    </div>
  );
};

export default Presentacion;
