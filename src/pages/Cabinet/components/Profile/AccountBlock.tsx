import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../providers/authProvider";
import Modal from "../../../../components/Modal";
import ProfileEditForm from "./AccountForm";
import { IPatient, ProfileEditType } from "../../../../types/types";

const ProfileBlock: React.FC = () => {
  const { user, update } = useContext(AuthContext)!;
  const [isModalOpen, setModalOpen] = useState(false);
  const [editType, setEditType] = useState<ProfileEditType>("none");

  const handleSubmit = (updatedUser: IPatient) => {
    update(updatedUser);
  };

  useEffect(() => {
    console.log("Current user:", user)
  }, [user])

  useEffect(() => {
    if (editType === "none") {
      setModalOpen(false);
    } else if (!isModalOpen) {
      setModalOpen(true);
    }
  }, [editType, isModalOpen]);

  return (
    <div className="space-y-4 flex flex-col content-end h-full justify-evenly">
      <div className="m-4 space-y-4">
        <h3 className="text-2xl font-bold">Profile Info</h3>
        <div>
          <strong>Email:</strong> {user && user.email}
        </div>
        <div>
          <strong>Password:</strong> {"*".repeat(8)}
        </div>
        <button
          onClick={() => setEditType("account_info")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-lg mt-4">
          Edit Profile
        </button>
      </div>

      <div className="m-4 space-y-4">
        <h3 className="text-2xl font-bold">Personal Info</h3>
        <div>
          <strong>First Name:</strong> {user && user.firstName}
        </div>
        <div>
          <strong>Last Name:</strong> {user && user.lastName}
        </div>
        <div>
          <strong>Age:</strong> {user && user.age}
        </div>
        <div>
          <strong>Date of Birth:</strong>{" "}
          {user && user.dateOfBirth.toDateString()}
        </div>
        <div>
          <strong>Address:</strong>{" "}
          {`${user && user.address.city}, ${user && user.address.address}, ${
            user && user.address.country
          }`}
        </div>
        <div>
          <strong>Phone Number:</strong> {user && user.phoneNumber}
        </div>
        <div>
          <strong>Sex:</strong> {user && user.sex}
        </div>
        <button
          onClick={() => setEditType("personal_info")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded text-lg mt-4">
          Edit Personal Info
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setEditType("none")}>
        <ProfileEditForm
          patient={user!}
          editType={editType}
          submitUser={handleSubmit}
          closeModal={() => setEditType("none")}
        />
      </Modal>
    </div>
  );
};

export default ProfileBlock;

