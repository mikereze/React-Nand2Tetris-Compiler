import React from 'react';
import WhiteSpaceRemover from './WhiteSpaceRemover';
import {useState} from 'react';

const Splitter = ({content,realCount}) => {

    const arranger = (content) => {
        var arrangerCount = 0;
        content.map((item) => {      
            if(item === "Result"){
                arrangerCount++;      
            }
            return arrangerCount
        });
        return arrangerCount;
    }

    var splitter_count;
    const [separator_loader,setseparator_loader] = useState(false);
   
    Promise.all([
        splitter_count = arranger(content)
    ]).then( () => {
        if(splitter_count === realCount){
            setseparator_loader(true);
        }
    })
    return (
        <div>
            {separator_loader && <WhiteSpaceRemover content={content}/>}
         </div>
    ); 
}

export default Splitter;

