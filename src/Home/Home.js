import { Button, Checkbox } from "@mui/material";
import React, {  useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { stateContext } from "../Context/StateContext";
import DeleteIcon from '@mui/icons-material/Delete';


const Home = () => {
  const { state, dispatch } = useContext(stateContext); //state reducer
  const navigate = useNavigate();
  const [items, setItems] = useState(state.tasks||[]);
  console.log("state",state, dispatch);
  console.log("state tasks",state.tasks)
  console.log("state.tasks type:", typeof state.tasks);
  const[search,setSearch] = useState();
  
  // useEffect(() => {
  //   const storedItems = state.tasks;
  //   if (storedItems !== null) {
  //       console.log(storedItems)
  //       setItems(storedItems);
  //   }
  // }, [state.tasks]);
  
  // console.log("storedItems" ,state.tasks)


const handleDelete = (id) => {
    const newArray = state.tasks.filter((item) => item.id !== id);
    dispatch({ type: "DELETE_TASK", payload: newArray });
  };
  const handleEdit = (item) => {
    navigate(`/Form?name=${item.name}`);
  };
  const sortingData = (order) => {
    let unSortedTasks = state.tasks;
    if (order === "asc") {
      let ascTasks = unSortedTasks.sort((a, b) => (a.name > b.name ? 1 : -1));
      console.log(ascTasks);
      dispatch({ type: "ASC_TASK", payload: ascTasks });
    } else if (order === "desc") {
      let descTasks = unSortedTasks.sort((a, b) => (a.name < b.name ? 1 : -1));
      console.log(descTasks);
      dispatch({ type: "DESC_TASK", payload: descTasks });
    }
  };
  const getAllTask = () => {
    const storedItems = [...items]
    console.log("allTasks", storedItems);
    setItems(storedItems);
    console.log(storedItems)
    dispatch({ type: "ALL_TASK", payload: storedItems });
  };
  
  const getFilteredTasks = () => {
    const filteredTasks = state.tasks && state.tasks.filter((item) => item.status === true);
    console.log('filteredTasks', filteredTasks);
   dispatch({type:'FILTERED' ,payload:filteredTasks})
    //localStorage.setItem('tasks',JSON.stringify(filtered))
  };
  const getClickedBox = (id) => {
    const newArray = [...state.tasks]; // create a copy of the current array
    newArray[id].status = !newArray[id].status; // toggle the isCompleted property of the clicked task
    dispatch({type:"UPDATE", payload:newArray})
     // update the state with the new array//

    if(newArray[id].status === false){
      const filtered = state.tasks.filter((item)=> state.tasks.filter ? item.status === true : true);
      dispatch({type:"CHECKED", payload:filtered})
    
  };
 
}
const handleSearch = (event) => {
  setSearch(event.target.value);
  if (event.target.value === "") {
    dispatch({ type: "TASKS..", payload: state.tasks });
  } else {
    const searchItems = state.tasks.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    dispatch({ type: "SEARCH", payload: searchItems });
  }
};


    return (
    <>
      <div>
        Task<br></br>
        <input type="text" placeholder="Search" value={search} onChange={handleSearch} />
        {state.tasks ?
          (state.tasks.map((item, index) => (
            <div key={index}>
              <b>Id :</b>
              {item.id} <b>Name : </b>
              {item.name} <b>Description :</b> {item.description}{" "}
              <b>Status :</b> {item.status ? "completed" : "notComplete"}
              <Checkbox
                type="checkbox"
                checked={item.status}
                onChange={() => getClickedBox(item.id-1)} />
              
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={()=>handleDelete(item.id)}>Delete</Button>
              <Button  variant="contained" onClick={() => handleEdit(item)}>Edit</Button>
            </div>
          )))
        :(
          <div>No Matches Found!</div>
        )
        }
           <select onChange={(e) => sortingData(e.target.value)}>
          <option value="none">Sort By</option>
          <option value="asc">Ascending Order</option>
          <option value="desc">Descending Order</option>
        </select>
       <Link to="/Form">Go to Form</Link>
       <Button variant="outlined" onClick={getAllTask}>ALL</Button>
       <Button  variant="contained" onClick={getFilteredTasks}>Completed</Button>
      </div>
    </>
  );
};

export default Home;
