export const addItemToServer = async (task, date) => {
  try {
    const response = await fetch("http://localhost:8000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, date }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const item = await response.json();
    return mapServerToLocal(item);
  } catch (error) {
    console.error("Failed to add item:", error);
    return null;
  }
};
export const getItemFromServer = async () => {
  const response = await fetch("http://localhost:8000/api/todo", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const items = await response.json();
  return items.map(mapServerToLocal);
};
export const markedCompletedOnServer = async (id) => {
  const response = await fetch(
    `http://localhost:8000/api/todo/${id}/completed`,
    {
      method: "PUT",
       headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed:true }),
    }
  );
  const items = await response.json();
  return mapServerToLocal(items);
};
export const deletedFromServer = async (id) => {
  await fetch(`http://localhost:8000/api/todo/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return id;
};

const mapServerToLocal = (serverItems) => {
  return {
    id: serverItems._id,
    name: serverItems.task,
    dueDate: serverItems.date,
    completed: serverItems.completed,
    createdAt: serverItems.createdAt,
    updatedAt: serverItems.updatedAt,
  };
};
