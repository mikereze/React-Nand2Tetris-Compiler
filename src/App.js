import React from 'react';
import './App.css';
import {useState} from 'react';
import Commenthandling from './Components/Separators/Commenthandling'

const App = () => {

    let fileReader;
    const [ content, setContent] = useState([]);
    const [ loaded,  setLoaded] = useState(false);
    const [ realCount , setrealCount] = useState(0);
    var count = 0;

    const divider = (item,len) =>{
        const regexFiles = /[A-Za-z0-9].jack/;
        for(var x=0;x<len;x++){    
            if(regexFiles.test(item[x].name)){  
                handleFileChoosen(item[x]);
               count++;
            }
        }
    }

    const handleFileChoosen = (file) => {
        fileReader = new FileReader();
        fileReader.onload = handleFile
        fileReader.readAsText(file);  
    }

    const handleFile = (e) => {   
            setrealCount(count);
            var Result = "Result";
            setContent((prevState) => [...prevState,...e.target.result.trim().split("\n")]);
            setContent((prevState) =>  [...prevState,Result]);
            setLoaded(true);

    }

    return (
        <div>

        <input 
                 type="file"
                 directory=""
                 webkitdirectory=""
                 onChange = { (e) => divider(e.target.files,e.target.files.length)}/>
       {loaded && <p>You have loaded {realCount} Jack Files</p>}
       {loaded && <Commenthandling content={content} realCount = {realCount} />}
        </div>
    );
    
}





























export default App;