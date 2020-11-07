import React from 'react';


const ConvertToFile = ({content}) => {

    var count = 0
    const autoIncrement = () => {
        count++;
        return count
    }

    return (
        <div>
            {content.map((item) => {
                
                return  (
                    
                    <div key={autoIncrement()}>
                    {item}
                 </div>
                   )
            })}
        </div>

    );
}

export default ConvertToFile;

