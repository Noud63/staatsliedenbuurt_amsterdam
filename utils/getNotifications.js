
const getNotifications = async () => {
    try {
    const res = await fetch(`/api/getNotifications`, {
      method: "GET",
      cache: "no-store",      // avoid stale data
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch notifications: ${res.status}`);
    }

    const data = await res.json();

    if(!data || !Array.isArray(data.notifications)) {
      return { notifications: [] };
    }

    return data;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return { notifications: [] };
  }
}

export default getNotifications;