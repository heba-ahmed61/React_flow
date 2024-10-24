import { Handle, Position } from '@xyflow/react';
import { targetIcon } from '../../algorithm/targetIcons';
import CustomNodeChildren from './CustomNodeChildren';
const CustomNode = ({data}) => {
    return (
        <div className= {(data?.label == 'IF/Else Condition' || data?.label == 'IF' || data?.label == 'Else') ? "custom_condition_node_wrapper": "custom_node_wrapper"}  >
          <div className='node_item'>
          <div className='node_icon'>{targetIcon(data?.icon)}</div>
          <div className='node_title'>{data.label}</div>
          </div>
          {data?.label == "Card Networks" && <CustomNodeChildren/>}
          <Handle type="target" position={Position.Top} />
          <Handle type="source" position={Position.Bottom} />
          {/* {data?.sourceHandle?.map((handle, index) => (
            <Handle
              key={index}
              type="source"
              position={Position.Bottom}
              id={handle} // Ensure the handle is properly attached to the node
            />
          ))} */}
        </div>
      );
}
export default CustomNode