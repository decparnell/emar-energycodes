import styles from "../../styles.tooltip.module.css";

function ToolTip(props) {
    const textToHighlight = props.text
    const dataReq = await fetch(
        ''
      );
      const dataJson = await dataReq.json();
      const definition = dataJson.definition
    
    return (
            <div className={styles.tooltip}> 
            {textToHighlight}
                <span className={styles.tooltip}>{definition}</span>
            </div>
            
   );
}

export default ToolTip; 

