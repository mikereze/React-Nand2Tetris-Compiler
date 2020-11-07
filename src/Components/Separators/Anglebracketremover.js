import React from 'react';
import Tokenizer from '../Tokenizer';

const Anglebracketremover = ({content}) => {
    var content_anglebracketremoved = [];

    content.map( (singleLine) => {

        if(singleLine.startsWith("[") && singleLine.endsWith("]")){   // handles [anything]
                var index = singleLine.indexOf("[");
                var index2 = singleLine.indexOf("]");
                for(var x = 0; x<singleLine.length;x++){
                    if(singleLine.charAt(x) === "["){
                        content_anglebracketremoved.push("[")
                        index = singleLine.indexOf(singleLine.charAt(x));
                    }
                    if(singleLine.charAt(x) === "]"){
                        index2 = singleLine.indexOf(singleLine.charAt(x));
                    }

                }
                content_anglebracketremoved.push(singleLine.slice(index+1,index2));

                for(var a = 0; a<singleLine.length;a++){
                    if(singleLine.charAt(a) === "]"){
                        content_anglebracketremoved.push("]")
                    }
                }

        } 
        else if(singleLine.includes("[") && !singleLine.startsWith("[") && singleLine.endsWith("]")){ //handles anything[anything]
            var index3 = singleLine.indexOf("[");
            var index4;
            content_anglebracketremoved.push(singleLine.slice(0,index3));
            for(var y = 0; y<singleLine.length;y++){
                if(singleLine.charAt(y) === "["){
                    content_anglebracketremoved.push("[")
                    index3 = singleLine.indexOf(singleLine.charAt(y));
                }
                if(singleLine.charAt(y) === "]"){
                    index4 = singleLine.indexOf(singleLine.charAt(y));
                }

            }
            content_anglebracketremoved.push(singleLine.slice(index3+1,index4));

            for(var z = 0; z<singleLine.length;z++){
                if(singleLine.charAt(z) === "]"){
                    content_anglebracketremoved.push("]")
                }
            }

        }
        else if(!singleLine.includes("]") && singleLine.endsWith("[")){  //handles anyting[
            var index5 = singleLine.indexOf("[");
            content_anglebracketremoved.push(singleLine.slice(0,index5));
            for(var b=0;b<singleLine.length;b++){
                if(singleLine.charAt(b) === "["){
                    content_anglebracketremoved.push("[");
                }
            }   
        
        }   
        else if(!singleLine.startsWith("[") && singleLine.includes("[") && !singleLine.includes("]")&&!singleLine.endsWith("[")){     //handles anything[anything
            var index6 = singleLine.indexOf("[");
            content_anglebracketremoved.push(singleLine.slice(0,index6));
            for(var c=0;c<singleLine.length;c++){
                if(singleLine.charAt(c) === "["){
                    content_anglebracketremoved.push("[");
                    index6 = singleLine.indexOf("[");
                }
            }
            content_anglebracketremoved.push(singleLine.slice(index6+1));
             
        
        }
        else if(!singleLine.includes("[") && singleLine.endsWith("]")){   //handles anyting]
            var index7 = singleLine.indexOf("[");
            content_anglebracketremoved.push(singleLine.slice(0,index7));
            for(var d=0;d<singleLine.length;d++){
                if(singleLine.charAt(d) === "]"){
                    content_anglebracketremoved.push("]");
                }
            } 
        }
        else if(singleLine.startsWith("[") && !singleLine.includes("]")){   // handles [anything
            var index8;
            for(var e=0;e<singleLine.length;e++){
                if(singleLine.charAt(e) === "["){
                    content_anglebracketremoved.push("[");
                    index8 = singleLine.indexOf(singleLine.charAt(e));
                }
            }
            content_anglebracketremoved.push(singleLine.slice(index8 + 1));

        }
        else{
            content_anglebracketremoved.push(singleLine);
        }
        return null;
    })

        return (
            <div>
                <Tokenizer content={content_anglebracketremoved}/>
            </div>
        );
}

export default Anglebracketremover;
