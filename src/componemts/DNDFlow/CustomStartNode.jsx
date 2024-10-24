import { Handle, Position } from '@xyflow/react';
const StartNode = () => {
    return(
        <>
        <div className="start_node">
            START
        </div>
        <Handle type="source" position={Position.Bottom} />
        </>
    )
}
export default StartNode