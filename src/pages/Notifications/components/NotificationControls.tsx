import React from "react";
import { NotificationViewState, SortTypesState } from "../../../types/types";
import Modal from "../../../components/Modal";
import NotificationForm from "./NotificationForm";

interface NotificationControlsProps {
  onToggleView: (newState: NotificationViewState) => void;
  currentView: NotificationViewState;
  setSortType: (newSortType: SortTypesState) => void;
  curentSortType: SortTypesState;
  setSearchQuery: (newSearchQuery: string) => void;
  currentSearchQuery: string;
  setModalOpen: (newModalState: boolean) => void;
  isModalOpen: boolean;
}

const NotificationControls: React.FC<NotificationControlsProps> = ({
  onToggleView,
  currentView,
  setSortType,
  curentSortType,
  setSearchQuery,
  currentSearchQuery,
  setModalOpen,
  isModalOpen,
}) => {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortType(e.target.value as SortTypesState);
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Search notifications..."
          className="px-4 py-2 border rounded-md"
          value={currentSearchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 border rounded-md"
          value={curentSortType}
          onChange={handleSortChange}>
          <option value="none">None</option>
          <option value="date">Sort by Date</option>
          <option value="type">Sort by Type</option>
        </select>
      </div>
      <div className="text-xl font-bold">
        <span
          onClick={() => onToggleView("active")}
          className={`cursor-pointer ${
            currentView === "active" ? "text-blue-600" : "text-gray-400"
          }`}>
          Active
        </span>
        <span className="mx-2">|</span>
        <span
          onClick={() => onToggleView("archived")}
          className={`cursor-pointer ${
            currentView === "archived" ? "text-blue-600" : "text-gray-400"
          }`}>
          Archived
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setModalOpen(true)}>
          Create Notification
        </button>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}>
          <NotificationForm onSubmit={() => {}} onClose={() => setModalOpen(false)} />
        </Modal>
      </div>
    </div>
  );
};

export default NotificationControls;

