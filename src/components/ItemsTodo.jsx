import { Trash } from "lucide-react";
const ItemsTodo = ({ handleMarkComplted, todoItems, onDeleteClick }) => {
  // Separate incomplete and completed items
  const incompleteItems = todoItems.filter((item) => !item.completed);
  const completedItems = todoItems.filter((item) => item.completed);


  return (
    <div className="mt-4 space-y-4 px-4 py-4">
      {/* ✅ Incomplete Tasks Section */}
      {incompleteItems.length > 0 ? (
        incompleteItems.map((item) => (
          <div
            key={item.id}
            id={item.id}
            className="flex items-center justify-between border px-4 py-4 rounded-lg shadow-sm"
          >
            {/* Left side: checkbox + task name + createdAt */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleMarkComplted(item.id)}
                  className="w-5 h-5 text-blue-600 rounded  cursor-pointer"
                />
                <span className="text-lg md:text-2xl  font-medium  transition-all duration-300">
                  {item.name}
                </span>
              </div>

              {item.createdAt && (
                <span className="text-xs text-gray-500">
                  Created:{" "}
                  {new Date(item.createdAt).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </span>
              )}
            </div>

            {/* Right side: due date & delete button */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {new Date(item.dueDate).toLocaleString("en-US", {
                  timeZone: "Asia/Dhaka",
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>

              <button
                onClick={() => onDeleteClick(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
              >
               <Trash size={18}/>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-500 italic">
          No incomplete tasks
        </div>
      )}

      {/* ✅ Completed Tasks Section */}
      {completedItems.length > 0 && (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 text-center border-b pb-1">
            Completed Tasks
          </h2>

          {completedItems.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className="flex items-center justify-between border px-4 py-4 rounded-lg shadow-sm bg-gray-50"
            >
              {/* Left side: checkbox + task name */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleMarkComplted(item.id)}
                  className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-lg font-medium line-through text-gray-400">
                  {item.name}
                </span>
              </div>

              {/* Right side: delete button */}
              <button
                onClick={() => onDeleteClick(item.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
              >
                <Trash size={18}/>
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ItemsTodo;
