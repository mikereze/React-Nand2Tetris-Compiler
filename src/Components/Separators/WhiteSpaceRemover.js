import React from 'react';
import CotationRemover from './CotationRemover';

const WhiteSpaceRemover = ({content}) => {
    var content_new = []
    const regex_cotation = /[""'']/;
    content.map((singleLine) => {
            if(singleLine.includes(" ") && !regex_cotation.test(singleLine)){
                var each_singleLine = singleLine.split(" ");
                var length_of_singleLine = singleLine.split(" ").length;
                for(var x = 0;x < length_of_singleLine; x++){
                    if(each_singleLine[x] !== ""){
                        content_new.push(each_singleLine[x]);
    
                    }
                }
            }
            else{
                if(singleLine !== ""){
                    content_new.push(singleLine);
    
                }


        }
        return null;
    })
    return (
        <div>
            <CotationRemover content = {content_new} />
            </div>
    );
}

export default WhiteSpaceRemover;