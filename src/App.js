import './App.css';
import { useEffect ,useState } from 'react';


function Square({value,onSquareClick}){
  return (
      <button className="butn" onClick={onSquareClick}>{value}</button>
  )
}

function Reset({onResetClick}){
  return(
   <center> 
      <button className='reset' onClick={onResetClick}>Reset</button>
    </center>
  )
}


function App() {

  const [values,setValues]=useState(Array(9).fill(null)); //for the boxes
  const [isX,setIsX] = useState(true); // preset player 
  const [text,setText] = useState("Next Move  : "+(isX?'X':'O')); // to add the player to the box
  const [isDisplay,setIsDisplay] = useState(null); // to display the winner 
  const [toReset,setToReset] = useState('');

  // for the instant winnner declaration 
  useEffect(()=>{
    let whoWon = calculateWinner(values);
    if(whoWon)
    {
      setIsDisplay(whoWon+" : Won the Game");
      setTimeout(()=>{
        setIsDisplay(null);
      },3000);
      setText(whoWon+" : won the game ");
      setToReset("Press Reset to start a new game Or wait for 5 sec to restart");
      setTimeout(()=>{
        emptyBox();
        setToReset("");
      },8000);
      
    }
    else
    {
      let isData = (ele)=> ele==='X' || ele==='O';
      let data = values.every(isData);
      if(data){
        setIsDisplay("Match Tied");
        setText("Match Tied");
        setTimeout(()=>{
          setIsDisplay(null);
        },3000);
      }
    }
  },[values])

  function calculateWinner(squares)  {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

function handleClick(i,isx)
{
    if(values[i] === null)
    {
      let val = values.slice();
      val[i]=isX?'X':'O';
      setValues(val);
      setText("Next Move  : "+(!isX?'X':'O'));
      setIsX(!isX); 
    }

  }

  //to Reset the box
  function emptyBox(){
    let val = Array(9).fill(null);
    setValues(val);
    setToReset('');
  }

  return (
    <>
    <nav>
      <a href="/"><h2>Tic-Tac-Toe</h2></a>
    </nav>
    <div className='main'>
      <center><div className='mover'>{text}</div></center>
      <div className='box'>
        <div className='row'>
          <Square value={values[0]} onSquareClick={()=>{handleClick(0,isX)}}/>
          <Square value={values[1]} onSquareClick={()=>{handleClick(1,isX)}}/>
          <Square value={values[2]} onSquareClick={()=>{handleClick(2,isX)}}/>
        </div>
        <div className='row'>
          <Square value={values[3]} onSquareClick={()=>{handleClick(3,isX)}}/>
          <Square value={values[4]} onSquareClick={()=>{handleClick(4,isX)}}/>
          <Square value={values[5]} onSquareClick={()=>{handleClick(5,isX)}}/>
        </div>
        <div className='row'>
          <Square value={values[6]} onSquareClick={()=>{handleClick(6,isX)}}/>
          <Square value={values[7]} onSquareClick={()=>{handleClick(7,isX)}}/>
          <Square value={values[8]} onSquareClick={()=>{handleClick(8,isX)}}/>
        </div>
      </div>
      <div>
        <Reset onResetClick={emptyBox} />
      </div>
      <div className='winner' style={{display:(isDisplay?"block":"none")}} >
        <div className='person'>
          <p> {isDisplay} </p>
        </div>
      </div>
      <div className='resetText'>
        {toReset}
      </div>
      </div>
    </>
        
  );
}

export default App;