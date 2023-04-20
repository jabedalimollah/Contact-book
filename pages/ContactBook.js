import React, { useEffect, useState } from "react";
import styles from "../styles/ContactBookStyle.module.css";
import { FaUserAlt } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { BsFillCameraFill } from "react-icons/bs";
import Image from "next/image";
import Navbar from "./Navbar";
import ShowDetails from "./ShowDetails";
import Head from "next/head";

const ContactBook = () => {
  const [photoCondition, setPhotoCondition] = useState(false);
  const [shoWHide, setShowHide] = useState(false);
  const [photoFile, setPhotoFile] = useState("/user1.png");
  const [indexValue, setIndexValue] = useState();
  const [data, setData] = useState([]);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isNumberValid, setIsNumberValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [allData, setAllData] = useState({
    // picture: photoFile,
    picture: "/user1.png",
    name: "",
    phoneNumber: "",
    email: "",
  });
  const emailValidation = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(allData.email)) {
      setIsEmailValid(true);
    } else if (!regEx.test(email) && email !== "") {
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
    }
  };
  const phoneValidation = () => {
    const regex = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
    return !(!allData.phoneNumber || regex.test(allData.phoneNumber) === false);
  };
  const textChange = (e) => {
    setAllData({ ...allData, [e.target.name]: e.target.value });
  };
  const handleSave = (e) => {
    e.preventDefault();
    let nameValid = null;
    let numberValid = null;
    let emailValid = null;
    if (allData.name === "" || allData.name === " ") {
      nameValid = false;
      setIsNameValid(false);
    } else {
      nameValid = true;
      setIsNameValid(true);
    }
    // =================== Name Validation ============================
    // const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    // if (!regName.test(allData.name)) {
    //   // alert('Invalid name given.');
    //   setIsNameValid(false);
    //   nameValid = false;
    // } else {
    //   // alert('Valid name given.');
    //   setIsNameValid(true);
    //   nameValid = true;
    // }
    const isPhoneValid = phoneValidation();
    if (isPhoneValid) {
      setIsNumberValid(true);
      numberValid = true;
    } else {
      setIsNumberValid(false);
      numberValid = false;
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
      setData(data.concat(allData));
    }
  };
  const handleShowHide = () => {
    setShowHide(false);
  };
  const handleClearBtn = () => {
    setAllData({
      // picture: "/user1.png",
      ...allData,
      name: "",
      phoneNumber: "",
      email: "",
    });
  };
  const handlePicture = (e) => {
    // console.log(e.target.files[0]);
    const temp = e.target.files[0];
    const x = URL.createObjectURL(temp);

    setPhotoFile(x);
    setAllData({ ...allData, picture: x });
    setPhotoCondition(false);
  };
  const handleDataContain = (index) => {
    setIndexValue(index);
    setShowHide(true);
  };
  const reverseData = (dataValue, index) => {
    data[index] = dataValue;
    setData([...data]);
  };
  const DeleteData = (ind) => {
    setData(
      data.filter((value, index) => {
        return !(index == ind);
      })
    );
  };
  useEffect(() => {}, []);
  return (
    <>
      <Head>
        <title>Contact-Book</title>
      </Head>
      <Navbar />

      <div className="main">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <form className="form" onSubmit={(e) => e.preventDefault()}>
                {" "}
                <div className="picture-box">
                  <div
                    className="picture-sub-box"
                    style={{
                      // backgroundImage: `url("/user1.png")`,
                      // backgroundImage: `url(${URL.createObjectURL(photoFile)})`,
                      backgroundImage: `url(${allData.picture})`,
                      // backgroundImage: `url(${photoFile})`,
                      backgroundPosition: "center",
                      backgroundSize: "contain",
                      // backgroundSize: "cover",
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
                      <div className="Choose-photo">
                        <input
                          type="file"
                          className="file-input"
                          name="picture"
                          onChange={handlePicture}
                          accept="image/png, image/jpeg, image/jpg, image/webp"
                        />
                        <h6 className="chooseGallery">Choose from Gallery</h6>
                      </div>
                      <button
                        className="default-photo"
                        onClick={() => {
                          setAllData({ ...allData, picture: "/user1.png" });
                          setPhotoCondition(false);
                        }}
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
                    onChange={textChange}
                    value={allData.name}
                    placeholder="Enter Full Name"
                    name="name"
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
                    value={allData.phoneNumber}
                    onChange={textChange}
                    placeholder="Enter Phone Number"
                    name="phoneNumber"
                  />
                </div>
                <div
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
                    value={allData.email}
                    onChange={textChange}
                    placeholder="Enter Email"
                    name="email"
                  />
                </div>
                <div className="button-box">
                  <button className="clear" onClick={handleClearBtn}>
                    Clear
                  </button>
                  <button className="save" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="col-lg-6">
              <div className="data-box">
                <div className="data-title">
                  <h6 className="contact-text">Contact Details</h6>
                </div>
                <div className="data-main-box">
                  <div className="show-data">
                    {data.map((item, index) => {
                      return (
                        <div key={index}>
                          <div
                            className="data-contain"
                            key={index}
                            // onClick={() => setShowHide(true) }
                            onClick={() => handleDataContain(index)}
                          >
                            <div className="img-cover">
                              <div
                                className="img-box"
                                style={{
                                  backgroundImage: `url(${item.picture})`,
                                  // backgroundImage: `url(${photoFile})`,
                                  // height: "40px",
                                  // width: "40px",
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                  // backgroundSize: "contain",
                                }}
                              ></div>
                            </div>

                            {/* <Image src={item.picture} width={20} height={20} /> */}
                            <h5 className="contact-name">{item.name}</h5>
                            <h5 className="contact-phone">
                              {item.phoneNumber}
                            </h5>
                          </div>
                          {shoWHide ? (
                            <ShowDetails
                              handleShowHide={handleShowHide}
                              data={data}
                              indexValue={indexValue}
                              reverseData={reverseData}
                              DeleteData={DeleteData}
                            />
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactBook;
