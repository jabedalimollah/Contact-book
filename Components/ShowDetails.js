import React, { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { BsFillCameraFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Image from "next/image";

const ShowDetails = ({
  handleShowHide,
  data,
  indexValue,
  reverseData,
  DeleteData,
}) => {
  const [photoCondition, setPhotoCondition] = useState(false);
  const [deleteCondition, setDeleteConddition] = useState(false);
  const [showPic, setShowPic] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [allData, setAllData] = useState({
    picture: data[indexValue].picture,
    name: data[indexValue].name,
    phoneNumber: data[indexValue].phoneNumber,
    email: data[indexValue].email,
  });
  // console.log(data);
  const phoneValidation = () => {
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    return !(!allData.phoneNumber || regex.test(allData.phoneNumber) === false);
  };
  const handleSave = (e) => {
    e.preventDefault();
    let nameValid = null;
    let numberValid = null;
    let emailValid = null;
    const isPhoneValid = phoneValidation();
    if (isPhoneValid) {
      setIsNumberValid(true);
      numberValid = true;
    } else {
      setIsNumberValid(false);
      numberValid = false;
    }
    if (allData.name === "" || allData.name === " ") {
      nameValid = false;
      setIsNameValid(false);
    } else {
      nameValid = true;
      setIsNameValid(true);
    }
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(allData.email)) {
      setIsEmailValid(true);
      // setIsNumberValid(true);
      // setIsNameValid(true);
      // setData(data.concat(allData));
      emailValid = true;
    } else if (!regEx.test(allData.email) && allData.email !== "") {
      setIsEmailValid(false);
      emailValid = false;
      // setIsNumberValid(false);
      // setIsNameValid(false);
    } else {
      setIsEmailValid(false);
      emailValid = false;
      // setIsNumberValid(false);
    }
    // setData(data.concat(allData));
    // console.log(allData);
    if (nameValid && numberValid && emailValid) {
      // setData(data.concat(allData));
      reverseData(allData, indexValue);
      handleShowHide();
    }

    // reverseData(allData, indexValue);
    // handleShowHide();
  };
  const textChange = (e) => {
    setAllData({ ...allData, [e.target.name]: e.target.value });
  };
  const handlePicture = (e) => {
    // console.log(e.target.files[0]);
    const temp = e.target.files[0];
    const x = URL.createObjectURL(temp);

    // setPhotoFile(x);
    setAllData({ ...allData, picture: x });
    setPhotoCondition(false);
  };
  const handleDelete = () => {
    DeleteData(indexValue);
    handleShowHide();
  };
  return (
    <>
      <div className="show-box">
        <form className="form second-form" onSubmit={(e) => e.preventDefault()}>
          <button className="CancleBtn" onClick={() => handleShowHide()}>
            <GrClose className="cancleIconBtn" />
          </button>{" "}
          <div className="picture-box">
            <div
              className="picture-sub-box"
              style={{
                // backgroundImage: `url("/user1.png")`,
                backgroundImage: `url(${allData.picture})`,
                backgroundPosition: "center",
                // backgroundSize: "contain",
                backgroundSize: "cover",
              }}
            ></div>
            {/* <Image
                    src={"/user1.png"}
                    width={"60"}
                    height={"60"}
                    className="image-style"
                  /> */}
            <label className="image-file">
              {/* <input type="file" className="file-input" /> */}
              <button
                className="camera-box"
                onClick={() => setPhotoCondition(true)}
              >
                <BsFillCameraFill className="camera-icon" />
              </button>
            </label>
            {photoCondition ? (
              <div className="photo-box">
                <h3>Photo</h3>
                <button
                  className="viewPictureBtn"
                  onClick={() => setShowPic(true)}
                >
                  View
                </button>
                <div className="Choose-photo">
                  <input
                    type="file"
                    className="file-input"
                    onChange={handlePicture}
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                  />
                  <h6 className="chooseGallery">Choose from Gallery</h6>
                </div>
                <button
                  className="default-photo"
                  onClick={() =>
                    setAllData(
                      { ...allData, picture: "/user1.png" },
                      setPhotoCondition(false)
                    )
                  }
                >
                  Default Photo
                </button>
                <button
                  className="cancle-photo-section"
                  onClick={() => setPhotoCondition(false)}
                >
                  Cancle
                </button>
              </div>
            ) : null}
          </div>
          <div
            // className="form-child-box"
            className={`form-child-box ${
              isNameValid ? "emailValidate" : "emailValidateWrong"
            }`}
          >
            <label>
              {/* Name */}
              <FaUserAlt className="icon-color" />
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              name="name"
              value={allData.name}
              onChange={textChange}
            />
          </div>
          <div
            // className="form-child-box"
            className={`form-child-box ${
              isNumberValid ? "emailValidate" : "emailValidateWrong"
            }`}
          >
            <label>
              {/* Phone */}
              <FaPhoneAlt className="icon-color" />
            </label>
            <input
              type="text"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={allData.phoneNumber}
              onChange={textChange}
            />
          </div>
          <div
            //  className="form-child-box"
            className={`form-child-box ${
              isEmailValid ? "emailValidate" : "emailValidateWrong"
            }`}
          >
            <label>
              {/* Email */}
              <GrMail className="icon-color" />
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              value={allData.email}
              onChange={textChange}
            />
          </div>
          <div className="button-box">
            <button
              className="delete"
              // onClick={handleDelete}
              onClick={() => setDeleteConddition(true)}
            >
              Delete
            </button>

            {/* <button className="edit">Edit</button> */}
            <button className="save" onClick={handleSave}>
              Save
            </button>
          </div>
          {deleteCondition ? (
            <>
              <div className="deleteConformBox">
                <h5 className="deleteText">
                  Are you sure this contact is delete ?
                </h5>
                <div className="buttonBox">
                  <button
                    className="cancelBtn"
                    onClick={() => setDeleteConddition(false)}
                  >
                    Cancel
                  </button>
                  <button className="delete" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </div>
            </>
          ) : null}
          {showPic ? (
            <>
              <div className="showPicBox">
                <div
                  className="pictureBox"
                  style={
                    {
                      // backgroundImage: `url("/user1.png")`,
                      // backgroundImage: `url(${allData.picture})`,
                      // backgroundPosition: "center",
                      // backgroundSize: "cover",
                      // backgroundSize: "contain",
                    }
                  }
                >
                  <Image
                    src={allData.picture}
                    width={"200"}
                    height={"200"}
                    alt={allData.picture}
                  />
                </div>
                <button
                  className="cancelPic"
                  onClick={() => {
                    return setShowPic(false), setPhotoCondition(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          ) : null}
        </form>
      </div>
    </>
  );
};

export default ShowDetails;
