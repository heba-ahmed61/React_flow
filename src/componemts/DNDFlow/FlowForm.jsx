const FlowForm = ({editNode,onSubmit,nodeLabel,setNodeLabel}) => {
    return(
        <div className="form_wrapper">
            <form onSubmit={onSubmit}>
                <input onChange={(e) => setNodeLabel(e.target.value)} value={nodeLabel}/>
                <button>{editNode ? 'Edit Node': 'Add Node'}</button>
            </form>

        </div>
    )
}
export default FlowForm