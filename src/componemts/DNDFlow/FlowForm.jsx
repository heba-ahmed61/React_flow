const FlowForm = ({editNode,onSubmit,nodeLabel,setNodeLabel}) => {
    return(
        <div className="form_wrapper">
            <form onSubmit={(e) => onSubmit(e)}>
                <input placeholder="Node Title" onChange={(e) => setNodeLabel(e.target.value)} value={nodeLabel}/>
                <div className="form_btns">
                <button>{editNode ? 'Edit ': 'Add '}</button>
                {/* {editNode && <button>Delete</button>} */}
                </div>
            </form>

        </div>
    )
}
export default FlowForm