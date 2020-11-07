import React from 'react';
import Splitter from './Splitter';


const Commenthandling = ({content,realCount}) => {
   
    const content_main = [];
    for(var x= 0;x < content.length; x++){
        const singleLine = content[x].trim();
        if(!singleLine.startsWith("//") && !singleLine.startsWith("/**") && !singleLine.startsWith("*")){
                if(singleLine.includes("//")){   
                    const index = singleLine.indexOf("//");
                    content_main.push((singleLine.slice(0,index)).trim());
                }
                else{
                    content_main.push(singleLine.trim());
                }   
               
        }   
    }
    return (
            <div>
            <Splitter content={content_main} realCount={realCount}/>
            </div>
    );
}


export default Commenthandling;