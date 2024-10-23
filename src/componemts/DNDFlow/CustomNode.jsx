import { Handle, Position } from '@xyflow/react';
import { targetIcon } from '../../algorithm/targetIcons';
const CustomNode = ({data}) => {
    console.log(data?.label == 'IF/Else Condition')
    return (
        <div className="custom_node_wrapper" style={{backgroundColor: data?.label == 'IF/Else Condition' ? '#636670': null}} >
          <div className='node_item'>
          <div className='node_icon'>{targetIcon(data?.icon)}</div>
          <div className='node_title'>{data.label}</div>
          </div>
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