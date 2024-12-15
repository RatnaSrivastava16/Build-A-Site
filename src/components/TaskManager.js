import React, { useState, useEffect } from "react";

const TaskManager = () => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [goal, setGoal] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [collectionName, setCollectionName] = useState("");
  const [collections, setCollections] = useState({
    today: [],
    upcoming: [],
    goals: [],
    customCollections: {},
  });
  const [activeMenu, setActiveMenu] = useState("addTask");

  // Add task function
  const addTask = () => {
    if (task.trim() === "" || taskDate === "" || collectionName.trim() === "") return;

    const selectedDate = new Date(taskDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let updatedCollections = { ...collections };

    if (!updatedCollections.customCollections[collectionName]) {
      updatedCollections.customCollections[collectionName] = [];
    }

    if (selectedDate.getTime() === today.getTime()) {
      updatedCollections.today.push({
        id: Date.now(),
        text: task,
        collection: collectionName,
        completed: false,
      });
      alert(`Task added to Today's Task under '${collectionName}' collection.`);
    } else if (selectedDate > today) {
      updatedCollections.upcoming.push({
        id: Date.now(),
        text: task,
        collection: collectionName,
        completed: false,
      });
      alert(`Task added to Upcoming Tasks under '${collectionName}' collection.`);
    }

    updatedCollections.customCollections[collectionName].push({
      id: Date.now(),
      text: task,
      date: taskDate,
    });

    setCollections(updatedCollections);
    setTask("");
    setTaskDate("");
    setCollectionName("");
  };

  // Add goal function
  const addGoal = () => {
    if (goal.trim() === "" || goalDate === "") return;

    setCollections({
      ...collections,
      goals: [
        ...collections.goals,
        { id: Date.now(), text: goal, deadline: new Date(goalDate) },
      ],
    });
    alert("Goal added");
    setGoal("");
    setGoalDate("");
  };

  // Calculate remaining time for goals
  const calculateTimeRemaining = (deadline) => {
    const now = new Date();
    const diff = deadline - now;

    if (diff <= 0) return "Time's up!";

    const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${years}y ${months}m ${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Render tasks for a section
  const renderTasks = (title, tasks) => {
    const safeTasks = Array.isArray(tasks) ? tasks : [];

    return (
      <div>
        <h2>{title}</h2>
        <ul style={styles.taskList}>
          {safeTasks.map((t) => (
            <li key={t.id} style={styles.taskItem}>
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTaskCompletion(title, t.id)}
              />
              <span
                style={{
                  ...styles.taskText,
                  textDecoration: t.completed ? "line-through" : "none",
                }}
              >
                {t.text} ({t.collection})
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Toggle task completion status
  const toggleTaskCompletion = (section, id) => {
    const key = section.toLowerCase().replace("'s ", "");
    setCollections({
      ...collections,
      [key]: collections[key].map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ),
    });
  };

  // Upcoming section with add task functionality
  const UpcomingSection = () => {
    const [newTask, setNewTask] = useState("");
    const [newTaskDate, setNewTaskDate] = useState("");
    const [newCollectionName, setNewCollectionName] = useState("");

    const addTaskToUpcoming = () => {
      if (newTask.trim() === "" || newTaskDate === "" || newCollectionName.trim() === "") return;

      const selectedDate = new Date(newTaskDate);
      const updatedCollections = { ...collections };

      if (!updatedCollections.customCollections[newCollectionName]) {
        updatedCollections.customCollections[newCollectionName] = [];
      }

      if (selectedDate > new Date()) {
        updatedCollections.upcoming.push({
          id: Date.now(),
          text: newTask,
          collection: newCollectionName,
          completed: false,
        });
        updatedCollections.customCollections[newCollectionName].push({
          id: Date.now(),
          text: newTask,
          date: newTaskDate,
        });

        setCollections(updatedCollections);
        setNewTask("");
        setNewTaskDate("");
        setNewCollectionName("");
        alert(`Task added to Upcoming Tasks under '${newCollectionName}' collection.`);
      } else {
        alert("Please select a future date for upcoming tasks.");
      }
    };

    return (
      <div>
        <h2>Upcoming Tasks</h2>
        <div style={styles.addTaskSection}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task..."
            style={styles.input}
          />
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            style={styles.input}
          />
          <input
            type="text"
            value={newCollectionName}
            onChange={(e) => setNewCollectionName(e.target.value)}
            placeholder="Enter collection name..."
            style={styles.input}
          />
          <button onClick={addTaskToUpcoming} style={styles.button}>
            Add Task
          </button>
        </div>

        <div style={styles.collectionSection}>
          {Object.keys(collections.customCollections).map((collection) => (
            <div key={collection} style={styles.collectionCard}>
              <h3>{collection}</h3>
              <ul style={styles.taskList}>
                {collections.customCollections[collection].map((task) => (
                  <li key={task.id} style={styles.taskItem}>
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion("upcoming", task.id)}
                    />
                    <span
                      style={{
                        ...styles.taskText,
                        textDecoration: task.completed ? "line-through" : "none",
                      }}
                    >
                      {task.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Goals section with timer
  const GoalsSection = () => {
    const [timeRemaining, setTimeRemaining] = useState({});

    // Update the remaining time every second
    useEffect(() => {
      const interval = setInterval(() => {
        const updatedTimeRemaining = {};
        collections.goals.forEach((g) => {
          updatedTimeRemaining[g.id] = calculateTimeRemaining(g.deadline);
        });
        setTimeRemaining(updatedTimeRemaining);
      }, 1000);

      return () => clearInterval(interval); // Clean up interval on component unmount
    }, [collections.goals]);

    return (
      <div>
        <h2>Goals</h2>
        <div style={styles.addTaskSection}>
          <input
            type="text"
            placeholder="Enter goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            style={styles.input}
          />
          <input
            type="date"
            value={goalDate}
            onChange={(e) => setGoalDate(e.target.value)}
            style={styles.input}
          />
          <button onClick={addGoal} style={styles.button}>
            Add Goal
          </button>
        </div>

        <ul style={styles.taskList}>
          {collections.goals.map((g) => (
            <li key={g.id} style={styles.taskItem}>
              <span>{g.text}</span>
              <div style={styles.timer}>{timeRemaining[g.id]}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case "addTask":
        return (
          <div>
            <h2>Add Task</h2>
            <div style={styles.addTaskSection}>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter task..."
                style={styles.input}
              />
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                style={styles.input}
              />
              <input
                type="text"
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                placeholder="Enter collection name..."
                style={styles.input}
              />
              <button onClick={addTask} style={styles.button}>
                Add Task
              </button>
            </div>
          </div>
        );

      case "todayTasks":
        return renderTasks("Today's Task", collections.today);

      case "upcomingTasks":
        return <UpcomingSection />;

      case "goals":
        return <GoalsSection />;

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h3>Menu</h3>
        <ul style={styles.menuList}>
          <li onClick={() => setActiveMenu("addTask")}>Add Task</li>
          <li onClick={() => setActiveMenu("todayTasks")}>Today's Task</li>
          <li onClick={() => setActiveMenu("upcomingTasks")}>Upcoming Tasks</li>
          <li onClick={() => setActiveMenu("goals")}>Goals</li>
        </ul>
      </div>

      <div style={styles.mainContent}>{renderContent()}</div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  sidebar: {
    width: "20%",
    backgroundColor: "#f4f4f4",
    padding: "1rem",
    boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
  },
  menuList: {
    listStyle: "none",
    padding: 0,
    cursor: "pointer",
  },
  mainContent: {
    flex: 1,
    padding: "1rem",
  },
  addTaskSection: {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    marginBottom: "1rem",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    cursor: "pointer",
  },
  taskList: {
    listStyle: "none",
    padding: 0,
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "0.5rem",
  },
  taskText: {
    marginLeft: "0.5rem",
  },
  timer: {
    fontSize: "0.9rem",
    color: "#555",
  },
  collectionSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
  },
  collectionCard: {
    border: "1px solid #ddd",
    padding: "1rem",
    borderRadius: "8px",
    width: "250px",
  },
};

export default TaskManager;
