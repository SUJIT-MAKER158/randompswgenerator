import React from 'react'
import {useState,useCallback,useEffect,useRef} from 'react'

 function App() {
  const[length,setLength]=useState(8)
  const[numberAllowed,setNumberAllowed]=useState(false);
  const[characterAllowed,setCharacterAllowed]=useState(false);
  const[Password,setPassword]=useState("")
  const paswordGenerator=useCallback(()=>{
     let pass=""
     let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
     if(numberAllowed) str+="0123456789"
     if(characterAllowed) str+="`~,;:{}[]?@#$^*&!"
     for(let i=1;i<=length;i++)
     {
       let char=Math.floor(Math.random()*str.length+1)
       pass+=str.charAt(char)

     }
     setPassword(pass);

  },[length,numberAllowed,characterAllowed])
  const passwordRef=useRef(null);
  const passwordCopy=useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password)
  },[Password])
  
  useEffect(()=>{
    paswordGenerator()
  },[length,numberAllowed,characterAllowed,paswordGenerator])
  
  return (
    <React.Fragment>
    <div className='w-full max-w-md mx-auto rounded-lg px-4 my-8 text-orange-500 bg-gray-800 shadow-md py-3'>
    <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className='flex shadow  mb-5'>
        <input type="text"
        value={Password}
        className='outline-none w-full py-1 px-3 rounded-lg'
        placeholder='password'
        readOnly
        ref={passwordRef}
        >
        </input>
        <button className='bg-blue-800 rounded-lg w-20 text-white font-medium tracking-wide' onClick={passwordCopy}>
        Copy
        </button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setLength(e.target.value)}}
          >
          </input>
          <label>Length:{length}</label>
        </div>
        <div>
          <input type='checkbox'
            defaultChecked={numberAllowed}
            onChange={()=>{
              setNumberAllowed((prev)=>!prev)
            }}
          />
          <label>Numbers</label>
        </div>
        <div>
          <input type='checkbox'
            defaultChecked={characterAllowed}
            onChange={()=>{
              setCharacterAllowed((prev)=>!prev)
            }}
          />
          <label>Charecter</label>
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}
export default App
