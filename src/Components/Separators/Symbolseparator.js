import React from 'react';
import CurlyBrackerRemover from './CurlyBrackerRemover';


const Symbolseparator = ({content}) => {
    var content_new = [];
    var regex_symbol = /[-*+.,/&|<>=~]/;  //check out for the . you might be wrong

    content.map( (singleLine) => {

            if(regex_symbol.test(singleLine) ){
                var count_main = 0;
                for(var y=0;y<singleLine.length;y++){
                    if(regex_symbol.test(singleLine.charAt(y))){
                        count_main++;
                    }
                }
                var starter = 0;
                var count = 0;
                for(var x=0;x<singleLine.length;x++){
                    if(regex_symbol.test(singleLine.charAt(x))){                
                        var index = singleLine.indexOf(singleLine.charAt(x),starter);
                        content_new.push(singleLine.slice(starter,index));
                        content_new.push(singleLine.charAt(x));
                        starter = index +1;
                        count++;
                        if(count === count_main){
                             content_new.push(singleLine.slice(starter,singleLine.length))
                        }    
                    }                    
                }   
        
            
            } 
            else {
                content_new.push(singleLine);

            }
    
            return content_new;  
    })

    return (
        <div>
            <CurlyBrackerRemover content={content_new}/>
        </div>
    );

}

export default Symbolseparator;