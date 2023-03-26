import React, { useState } from "react";
import "./profile.scss";

import Navbar from "../navbar/Navbar";
import Upload from "../../components/upload/Upload";
import noAvatarImg from "../../assets/noAvatar.png";

import { useGetUploadQuery } from "./profileApiSlice";
import { useGetUserQuery } from "./profileApiSlice";

import { useNavigate } from "react-router-dom";

import { useDeleteUserMutation } from "../../features/user/userApiSlice";

import { useUpdateUserMutation } from "../../features/user/userApiSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { data: userData } = useGetUserQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const handleUpdateUser = async () => {
    if (
      name.length < 3 &&
      email.length < 3 &&
      password.length < 3 &&
      oldPassword.length < 3
    ) {
      toast.warn("input length must be greater than three(3)");
      return;
    }
    const toastId = toast.loading("processing...");
    const response = await updateUser({
      ...(name !== "" && { name }),
      ...(email !== "" && { email }),
      ...(oldPassword !== "" && { oldPassword }),
      ...(password !== "" && { newPassword: password }),
    }).unwrap();
    if (response === "serverError") {
      toast.update(toastId, {
        type: "error",
        render: "server error, try again later",
        isLoading: false,
        autoClose: 5000,
      });
      return;
    }
    if (response === "incorrect password") {
      toast.update(toastId, {
        type: "error",
        render: "incorrect old password",
        isLoading: false,
        autoClose: 5000,
      });
    }

    if (response.name) {
      toast.update(toastId, {
        type: "success",
        render: "successful",
        isLoading: false,
        autoClose: 5000,
      });
    }
    return;
  };

  const handledeleteUser = async () => {
    const response = await deleteUser().unwrap();
    if (response === "user deleted") {
      navigate("/");
    }
  };
  const { data: uploadData } = useGetUploadQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [route, setRoute] = useState("form");

  return (
    <>
      <Navbar />
      <div className="profile__wrapper">
        <div className="profile__card">
          <div className="profile__card__wallpapaer"></div>
          <div className="profile__card__logo">
            {uploadData && <img alt="profile-pic" src={uploadData} />}
            {!uploadData && <img alt="noAvatar" src={noAvatarImg} />}
          </div>
          <div className="profile__card__upload">
            <button
              style={{
                fontSize: "0.8em",
                backgroundColor: "var(--bg-grey-300)",
                fontFamily: "Acme",
              }}
              onClick={() => {
                if (route === "form") {
                  setRoute("upload");
                }
                if (route === "upload") {
                  setRoute("form");
                }
              }}
            >
              {route === "form" ? "Upload Image" : "Change Credential"}
            </button>
          </div>
          <div className="profile__card__details">
            <b style={{ fontFamily: "Acme" }}>{userData?.name}</b>
            <p style={{ fontFamily: "Acme" }}>{userData?.email}</p>
            <p style={{ fontFamily: "Acme" }}>{userData?.joined}</p>
          </div>
          <div className="profile__card__delete">
            <button
              style={{
                backgroundColor: "red",
                fontSize: "0.8em",
                fontFamily: "Acme",
              }}
              onClick={handledeleteUser}
            >
              Delete account
            </button>
          </div>
        </div>
        {route === "form" && (
          <div>
            <div className="profile__card__form">
              <div className="profile__card__form__input">
                <p className="profile__card__form__input__label">Username</p>
                <input
                  type="text"
                  onClick={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="profile__card__form__input">
                <p className="profile__card__form__input__label">Email</p>
                <input
                  type="text"
                  onClick={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="profile__card__form__input">
                <p className="profile__card__form__input__label">Password</p>
                <input
                  type="text"
                  onClick={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className="profile__card__form__input">
                <p className="profile__card__form__input__label">
                  Old Password
                </p>
                <input
                  type="text"
                  onClick={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <button
              onClick={handleUpdateUser}
              className="profile__card__form__button"
              style={{ height: "45px" }}
            >
              Submit
            </button>
          </div>
        )}
        {route === "upload" && (
          <div className="profile__card__upload">
            <Upload />
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
