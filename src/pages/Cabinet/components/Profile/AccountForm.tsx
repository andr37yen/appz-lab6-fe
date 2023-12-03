import React, { useState } from "react";
import { Gender, IPatient, ProfileEditType } from "../../../../types/types";
import { calculateAge, formatDate } from "../../../../utils/timeHelper";

interface ProfileEditFormProps {
  patient: IPatient;
  editType: ProfileEditType;
  submitUser: (updatedUser: IPatient) => void;
  closeModal: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({
  patient,
  editType,
  submitUser,
  closeModal,
}) => {
  const [editedUser, setEditedUser] = useState<IPatient>({ ...patient });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitUser(editedUser);
    closeModal();
  };

  const handlePlainChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      address: { ...editedUser.address, [name]: value },
    });
  };

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const dateOfBirth = new Date(event.target.value);

    setEditedUser({
      ...editedUser,
      dateOfBirth,
      age: calculateAge(dateOfBirth),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {editType === "account_info" && (
        <div>
          <h3 className="text-xl font-bold mb-2">Edit Profile</h3>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={editedUser.email}
              onChange={handlePlainChange}
              className="px-4 py-2 border rounded-md w-full mb-2"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={editedUser.password}
              onChange={handlePlainChange}
              className="px-4 py-2 border rounded-md w-full"
            />
          </div>
        </div>
      )}

      {editType === "personal_info" && (
        <div>
          <h3 className="text-xl font-bold mb-2">Edit Personal Info</h3>

          <div className="flex mb-2">
            <div className="mx-2 flex-1">
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={editedUser.firstName}
                onChange={handlePlainChange}
                className="px-4 py-2 border rounded-md w-full mb-2"
              />
            </div>
            <div className="mx-2 flex-1">
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={editedUser.lastName}
                onChange={handlePlainChange}
                className="px-4 py-2 border rounded-md w-full mb-2"
              />
            </div>
          </div>
          <div className="flex mb-2">
            <div className="flex-1 mx-2">
              <label>Date of birth:</label>
              <input
                id="content"
                type="date"
                value={formatDate(editedUser.dateOfBirth)}
                onChange={handleDateChange}
                placeholder=""
                className="px-4 py-2 border rounded-md w-full"
              />
            </div>
            <div className="flex">
              <div>
                <label>Sex:</label>
                <select
                  className="px-4 py-2 border rounded-md w-full block"
                  value={editedUser.sex}
                  onChange={(e) =>
                    setEditedUser({
                      ...editedUser,
                      sex: e.target.value as Gender,
                    })
                  }>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex mb-2">
            <div className="mx-2 flex-1">
              <label>Country:</label>
              <input
                type="text"
                name="country"
                value={editedUser.address.country}
                onChange={handleAddressChange}
                className="px-4 py-2 border rounded-md w-full mb-2"
              />
            </div>
            <div className="mx-2 flex-1">
              <label>City:</label>
              <input
                type="text"
                name="city"
                value={editedUser.address.city}
                onChange={handleAddressChange}
                className="px-4 py-2 border rounded-md w-full mb-2"
              />
            </div>
          </div>
          <div className="mx-2 mb-2">
            <label>Address:</label>
            <input
              type="text"
              name="address"
              value={editedUser.address.address}
              onChange={handleAddressChange}
              className="px-4 py-2 border rounded-md w-full mb-2"
            />
          </div>
          <div className="mx-2 mb-2">
            <label>Phone Number:</label>
            <input
              type="text"
              name="phoneNumber"
              value={editedUser.phoneNumber}
              onChange={handlePlainChange}
              className="px-4 py-2 border rounded-md w-full mb-2"
            />
          </div>
        </div>
      )}

      <div className="mb-4 justify-between flex">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          Submit
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={closeModal}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProfileEditForm;

