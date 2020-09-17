import React from 'react';

import classes from './DescriptionDetail.module.css'

const DescriptionDetail = (props) => {
  const { content } = props;

  const lineBreak = (index) => {
    if (index < content.length -1) {
      return <hr/>
    }
  }

  return (
     <div className={classes.DescriptionItem}>
       {content.map((item, i) => {
         const index = i + 1;

         return (
             <div key={index}>
               <div className={classes.RowItem}>
                 <div className={classes.LanguageLevel}>
                   <h3>{index}</h3>
                   <hr />
                   <h3>{item.languageLevel}</h3>
                 </div>
                 <article>{item.descriptionText}</article>
               </div>
                {lineBreak(i)}
              </div>
         )
       })}
     </div>
  );
};

export default DescriptionDetail;