import { useNavigate } from "react-router-dom";
import { ReactComponent as FemaleAvatar } from "../../../assets/images/undraw_female_avatar_efig.svg";
import { ReactComponent as MaleAvatar } from "../../../assets/images/undraw_male_avatar_g98d.svg";
import { GENDER_TYPE } from "../../constants";
import Button from "../../global/button";
import "./uploadImage.scss";

interface UploadImageProps {
  gender: string;
}

const UploadImage: React.FC<UploadImageProps> = ({ gender }) => {
  const navigate = useNavigate();

  const handleDone = () => {
    navigate("/chat");
  };

  return (
    <div className="upload_image">
      <div className="avatar">
        {gender === GENDER_TYPE.MALE ? <MaleAvatar /> : <FemaleAvatar />}
      </div>
      <div className="action">
        {/* upcoming feature */}
        {/* <Button text="Upload Picture" type="button" /> */}
        <Button text="Done" type="button" onClick={handleDone} />
      </div>
    </div>
  );
};

export default UploadImage;
