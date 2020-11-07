import React from 'react';
import Symbolseparator from './Symbolseparator';


const SemicolonRemover = ({content}) => {

    var content_colonremoved = [];
    content.map( (singleLine) => {
        if(singleLine.endsWith(";")){                           // handles ;
            var index_semicolon = singleLine.indexOf(";");
            content_colonremoved.push(singleLine.slice(0,index_semicolon));
            content_colonremoved.push(";");
        }  
        else{
            content_colonremoved.push(singleLine);
        }
        return null;  
    })


    return (
        <div>
            <Symbolseparator content={content_colonremoved}/>
        
        </div>

    );
}

export default SemicolonRemover;