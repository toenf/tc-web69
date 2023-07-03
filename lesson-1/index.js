import express from "express";
import crypto from "crypto"; // chỉ dùng cho server
const app = express();
let todoList = []; //để là let vì nếu để const thì sẽ không gán được ở dòng 68
// http://localhost:8000

// http://localhost:8000/welcome
// endpoint(ở đây endpoint là "/welcome")

//yêu cầu:
// dùng method: get
// tạo ra 1 biến lưu trữ todoList: const todoList =[]
// 1: Viết endpoint cho việc trả ra dữ liệu của todoList
// 2: Viết endpoint cho việc thêm dữ liệu vào mảng todoList
// mỗi 1 todoList có dạng như sau: {id, todoName, createdAt(thời gian khởi tạo)}
// thêm xong phải trả về cho client dữ liệu của todoList hiện tại

//BTVN:
// 1: Viết API dùng cho việc xóa todo theo id truyền qua query param
// 2: Tìm kiếm todoName theo các ký tự được truyền qua query param
// 3: Xóa mảng todoList -> Làm rỗng mảng
// 4: thực hiện cập nhật 1 todo: id, updatetodoName
// optional:
// 5: Xóa những phần tử todo trùng nhau về todoName (xóa phần tử thừa đi)
// 6: thực hiện phân trạng dữ liệu
//      truyền lên query param: + trang hiện tại là gì?
//                              + số dữ liệu cần hiển thị trên 1 trang (gõ gg: pagination array js)

app.get("/welcome", (req, res) => {
  res.send({
    message: "Xin chào client",
  });
});

app.get("/todoList", (req, res) => {
  res.send({
    message: " Create success",
    data: todoList,
  });
});

app.get("/todoList/add", (req, res) => {
  const { todoName } = req.query; //query param
  if (!todoName) {
    message: "Add failed";
    data: todoList;
  } else {
    const newTodo = {
      id: crypto.randomUUID(),
      todoName: todoName,
      createdAt: new Date().getTime(),
    };
    todoList.push(newTodo); // trả dữ liệu về mảng todoList
    res.send({
      message: "Add success",
      data: todoList,
    });
  }
});

app.get("/todoList/deleteId", (req, res) => {
  const { todoId } = req.query;
  if (!todoId) {
    message: "Delete ID failed";
    data: todoList;
  } else {
    const delTodoList = todoList.filter((item) => item.id !== todoId); // lọc trong cái newTodo xem có id nào giống với todoId thì đẩy nó vào delTodoList
    todoList = delTodoList; // gán delTodoList vào todoList
    res.send({
      message: "Delete success",
      data: todoList,
    });
  }
});

app.get("/todoList/search", (req, res) => {
  const { newTodoName } = req.query;
  if (!newTodoName) {
    data: todoList;
  } else {
    const searchTodoList = todoList.filter(
      (name) => name.todoName.includes(newTodoName) // lọc trong todoName xem có phần tử nào giống với newTodoName(là cái mình nhập) thì đẩy nó vào searchTodoList
    );
    res.send({
      message: "Search success",
      data: searchTodoList,
    });
  }
});

app.get("/todoList/deleteAll", (req, res) => {
  todoList.length = 0;
  res.send({
    message: "Delete all success",
    data: todoList,
  });
});

app.get("/todoList/update", (req, res) => {
  const { todoId, updateTodoName } = req.query;
  const checkId = todoList.findIndex((item) => item.id === todoId);
  if (checkId == -1) {
    res.send({ message: "Can't find ID", data: todoList });
  } else {
    const newTodoList = {
      id: todoId,
      todoName: updateTodoName,
      createdAt: new Date().getTime(),
    };
    todoList[checkId] = newTodoList;
    res.send({
      message: "Update todoName success",
      data: todoList,
    });
  }
});

app.listen(8000, () => {
  console.log("Run success");
});
