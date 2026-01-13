import React, { useEffect, useState } from "react"
const localSave = () => {
    const lists = localStorage.getItem("mytodolist")
  

    return JSON.parse(lists);

}
const Main = () => {
    const [input_value, setInput_value] = useState("")
    const [finalData, setFinalData] = useState(localSave())
    const [ToggleButton, setToggleButton] = useState(false)
    const [EditItem, setEditItem] = useState();
    const inputFunction = (event) => {
       
        setInput_value(event.target.value)
    }
    const printFunction = () => {
        const objData = {
            name: input_value,
            id: new Date().getTime().toString()

        }
        if (ToggleButton) {
            setFinalData(finalData.map((curelem) => {
                if (curelem.id === EditItem) {
                    return { ...curelem, name: input_value }
                }
                else {
                    return curelem
                }
            }))
            setInput_value("")
            setToggleButton(false)
            setEditItem(null)

        }
        else {
            setFinalData([...finalData, objData])
           
            setInput_value("")
        }
    }
    const deleteFunction = (idd) => {
       
   

        const newData = finalData.filter((curelem) => {

            return curelem.id !== idd;


        })
     


        setFinalData(newData)
    }
    const editFunction = (editId) => {
        setEditItem(editId)
        const value_input = finalData.find(
            (curelem) => curelem.id === editId
        );

        setInput_value(value_input.name);
        setToggleButton(true)

    }
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(finalData))
    }, [finalData])
    return (
        <>
            <div className="container">
                <div className="input">
                    <input placeholder="Enter the work" onChange={inputFunction} className="input_input" value={input_value} />
                    {ToggleButton ? (<i className="far fa-edit add-btn" onClick={printFunction}></i>)
                        :
                        (<i className="fa fa-plus add-btn" onClick={printFunction} ></i>)}

                </div>
                {finalData.map((curelem) => {
                    return (
                        <div className="todo_data">
                            <p>{curelem.name}</p>
                            <i className="far fa-edit add-btn" onClick={() => editFunction(curelem.id)}></i>
                            <i className="far fa-trash-alt add-btn" onClick={() => deleteFunction(curelem.id)}></i>
                        </div>
                    )
                })}
                <div className="button">
                    <button onClick={() => { setFinalData([]) }}>Check List</button>
                </div>

            </div>



        </>




    )



}
export default Main