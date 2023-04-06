import { Button, Checkbox, TextField } from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { stateContext } from "../Context/StateContext";

const FormTask = () => {
  const [params] = useSearchParams();
  console.log(params.get("name"));
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [status, setStatus] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);
  const { state, dispatch } = useContext(stateContext); //state reducer
  //const[task,setTask] = useState([]);

  console.log("state", state.tasks, dispatch);

  useEffect(() => {
    if (params.get("name") !== null) {
      const temp = state.tasks;
      const obj = temp.find((item) => item.name === params.get("name"));
      console.log(obj);
      setId(obj.id);
      setName(obj.name);
      setDes(obj.description);
      setStatus(obj.status);
    }
  }, [params, state.tasks]);

  const ChangeInput = (e) => {
    console.log(e.target.value);
    if (e.target.name === "id") {
      setId(e.target.value);
    } else if (e.target.name === "taskName") {
      setName(e.target.value);
    } else if (e.target.name === "description") {
      setDes(e.target.value);
    } else setStatus(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, name, des, status);
    if (name === "" && des === "") {
      setShowErrMsg(true);
    } else if (params.get("name") !== null) {
      const updatedTask = {
        id: id,
        name: name,
        description: des,
        status: status,
      };
      const updatedTasks = state.tasks.map((t) =>
        t.name === params.get("name") ? updatedTask : t
      );
      dispatch({ type: "UPDATE_TASK", payload: updatedTasks });
    } else {
      const newTask = {
        id: id,
        name: name,
        description: des,
        status: status,
      };
      //setTask([...task, newTask]);
      dispatch({ type: "ADD_TASK", payload: [...state.tasks, newTask] });
    }
    setId("");
    setName("");
    setDes("");
    setStatus(false);
  };

  useEffect(() => {
    dispatch({ type: "ADD_TASK", payload: state.tasks });
  }, [dispatch, state.tasks]);

  console.log(state.tasks);
  console.log("state.tasks type:", typeof state.tasks);

  return (
    <div>
      FormTask
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            id="filled-basic"
            label="Id"
            variant="filled"
            name="id"
            value={id}
            onChange={ChangeInput}
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="Name"
            variant="filled"
            name="taskName"
            value={name}
            onChange={ChangeInput}
          />
        </div>
        {showErrMsg && name === "" && <p>name is required</p>}
        <div>
          <TextField
            id="filled-basic"
            label="Description"
            variant="filled"
            name="description"
            value={des}
            onChange={ChangeInput}
          />
        </div>
        {showErrMsg && des === "" && <p>description is required</p>}
        <div>
          <Checkbox  name="check" checked={status} onChange={ChangeInput} />
            
        </div>

        <div>
          {/* <input type="submit" value="Submit" /> */}
          <Button variant="contained" type="submit">Submit</Button>
        </div>
      </form>
      <Link to="/Home">Go to Home</Link>
    </div>
  );
};

export default FormTask;
