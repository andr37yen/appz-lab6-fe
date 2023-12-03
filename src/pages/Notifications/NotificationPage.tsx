import { useMemo, useState } from "react";
import NotificationControls from "./components/NotificationControls";
import NotificationGrid from "./components/NotificationGrid";
import { useNotifications } from "./hooks/useNotification";
import {
  NotificationStatus,
  NotificationViewState,
  SortTypesState,
} from "../../types/types";

function NotificationsPage() {
  const { notifications, loading, error } = useNotifications();
  const [viewType, setViewType] = useState<NotificationViewState>("active");
  const [sortType, setSortType] = useState<SortTypesState>("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleView = (type: "active" | "archived") => {
    setViewType(type);
  };

  const displayedNotifications = notifications.filter((notification) => {
    if (viewType === "active") {
      return (
        notification.status === NotificationStatus.Active ||
        notification.status === NotificationStatus.PendingConfirmation
      );
    }

    return (
      notification.status === NotificationStatus.Expired ||
      notification.status === NotificationStatus.Deleted
    );
  });

  const filteredAndSortedNotifications = useMemo(() => {
    const filtered = displayedNotifications.filter(
      (notification) =>
        notification.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    );

    const sorted = [...filtered];
    if (sortType === "date") {
      sorted.sort((a, b) => a.date.getTime() - b.date.getTime());
    } else if (sortType === "type") {
      sorted.sort((a, b) => a.type.localeCompare(b.type));
    }

    return sorted;
  }, [sortType, searchQuery, displayedNotifications]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <NotificationControls
        currentView={viewType}
        curentSortType={sortType}
        currentSearchQuery={searchQuery}
        onToggleView={handleToggleView}
        isModalOpen={isModalOpen}
        setSortType={setSortType}
        setSearchQuery={setSearchQuery}
        setModalOpen={setModalOpen}
      />
      <NotificationGrid notifications={filteredAndSortedNotifications} />
    </div>
  );
}

export default NotificationsPage;

