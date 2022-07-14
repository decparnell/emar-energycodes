import { useRouter } from "next/router";
import definitions from "../../pages/codes-schedules/definitions/[busterm]";

function tool_tip () {
    return (
        <div class="tooltip">{definitions}
            <span class="tooltiptext">{definitions}</span>
        </div>
    )
    
} 