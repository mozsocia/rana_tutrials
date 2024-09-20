
```javascript
const Todo = require('./models/Todo'); // Assuming the model is in a separate file

// 1. Find all todos
const findAllTodos = async () => {
  const todos = await Todo.find();
  return todos;
};

// 2. Find todos by completion status
const findTodosByStatus = async (completed) => {
  const todos = await Todo.find({ completed: completed });
  return todos;
};

// 3. Find a single todo by ID
const findTodoById = async (id) => {
  const todo = await Todo.findById(id);
  return todo;
};

// 4. Find todos created within a date range
const findTodosByDateRange = async (startDate, endDate) => {
  const todos = await Todo.find({
    createdAt: { $gte: startDate, $lte: endDate }
  });
  return todos;
};

// 5. Update a todo's completion status
const updateTodoStatus = async (id, completed) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    id,
    { completed: completed },
    { new: true }
  );
  return updatedTodo;
};

// 6. Delete todos older than a certain date
const deleteOldTodos = async (date) => {
  const result = await Todo.deleteMany({ createdAt: { $lt: date } });
  return result;
};

// 7. Find todos with pagination
const findTodosWithPagination = async (page, limit) => {
  const todos = await Todo.find()
    .skip((page - 1) * limit)
    .limit(limit);
  return todos;
};

// 8. Find and sort todos by creation date
const findAndSortTodos = async (sortOrder = 'asc') => {
  const todos = await Todo.find().sort({ createdAt: sortOrder });
  return todos;
};
```

Explanations:

1. `findAllTodos()`: Uses `Todo.find()` without any arguments to retrieve all todos from the database.

2. `findTodosByStatus(completed)`: Uses `Todo.find({ completed: completed })` to find todos based on their completion status.

3. `findTodoById(id)`: Uses `Todo.findById(id)` to find a single todo by its MongoDB ObjectId.

4. `findTodosByDateRange(startDate, endDate)`: Uses `$gte` (greater than or equal to) and `$lte` (less than or equal to) operators to find todos created within a specific date range.

5. `updateTodoStatus(id, completed)`: Uses `Todo.findByIdAndUpdate()` to update a todo's completion status. The `{ new: true }` option returns the updated document.

6. `deleteOldTodos(date)`: Uses `Todo.deleteMany()` with the `$lt` (less than) operator to delete todos created before a certain date.

7. `findTodosWithPagination(page, limit)`: Implements pagination using `skip()` to bypass a certain number of documents and `limit()` to restrict the number of documents returned.

8. `findAndSortTodos(sortOrder)`: Uses `sort()` to order the todos by creation date. The `sortOrder` parameter determines ascending ('asc') or descending ('desc') order.

These queries demonstrate various Mongoose methods and MongoDB operators. They can be used within your Express routes or other parts of your application where you need to interact with the Todo data.
