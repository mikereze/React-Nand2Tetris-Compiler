import React from 'react';
import BracketSeparator from './BracketSeparator';

const CurlyBrackerRemover = ({content}) => {
    var content_curlybracketremoved = [];

    content.map( (singleLine) => {

        if(singleLine.includes("{") ){   // handles anything{ 
            var index = singleLine.indexOf("{");

            content_curlybracketremoved.push(singleLine.slice(0,index));
            for( var x = 0; x < singleLine.length; x++){
                if(singleLine.charAt(x) === "{"){
                    content_curlybracketremoved.push("{")
                }
            }
        }
        else if(singleLine.includes("}")){   //handles anything}
            var index2 = singleLine.indexOf("}");

            content_curlybracketremoved.push(singleLine.slice(0,index2));
            for( var y = 0; y < singleLine.length; y++){
                if(singleLine.charAt(y) === "}"){
                    content_curlybracketremoved.push("}")
                }
            }
        }

        
        else{
            content_curlybracketremoved.push(singleLine);
        }
        return null;  

    })


        return (
            <div>
                <BracketSeparator content={content_curlybracketremoved}/>
            </div>
        );
}

export default CurlyBrackerRemover;