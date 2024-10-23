
import './App.css';
import DNDFlow from './componemts/DNDFlow';
import FlowComponent from './componemts/Flow/flow';
import MyFlow from './componemts/MyFlow/Myflow';

function App() {
  return (
    <div className="App" >
      {/* <MyFlow/> fe haga msh sh8la fel drag drop */}
         {/* <FlowComponent/>     */}
     <div style={{width:'100%', height:"100%"}}>
     <DNDFlow/>
     </div>
    </div>
  );
}

export default App;
