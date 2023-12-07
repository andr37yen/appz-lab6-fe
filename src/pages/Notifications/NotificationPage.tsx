import { useContext, useMemo, useState } from "react";
import { NotificationViewState, SortTypesState } from "../../types/types";
import { isNotRejectoedOrExpired } from "../../utils/timeHelper";
import NotificationControls from "./components/NotificationControls";
import NotificationGrid from "./components/NotificationGrid";
import { useNotifications } from "./hooks/useNotification";
import { AuthContext } from "../../providers/authProvider";

function NotificationsPage() {
  const { user } = useContext(AuthContext)!;
  const {
    notifications,
    loading,
    error,
    createNotification,
    editNotification,
    deleteNotification,
  } = useNotifications((user!).id);
  const [viewType, setViewType] = useState<NotificationViewState>("active");
  const [sortType, setSortType] = useState<SortTypesState>("none");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleToggleView = (type: "active" | "archived") => {
    setViewType(type);
  };

  const filteredAndSortedNotifications = useMemo(() => {
    const displayedNotifications = notifications.filter((notification) =>
      viewType === "active"
        ? isNotRejectoedOrExpired(notification)
        : !isNotRejectoedOrExpired(notification)
    );

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
  }, [sortType, searchQuery, notifications, viewType]);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <NotificationControls
        currentView={viewType}
        curentSortType={sortType}
        currentSearchQuery={searchQuery}
        isModalOpen={isModalOpen}
        onToggleView={handleToggleView}
        setSortType={setSortType}
        setSearchQuery={setSearchQuery}
        setModalOpen={setModalOpen}
        createNotification={createNotification}
      />
      <NotificationGrid
        notifications={filteredAndSortedNotifications}
        onDelete={deleteNotification}
        onEdit={editNotification}
      />
    </div>
  );
}

export default NotificationsPage;

