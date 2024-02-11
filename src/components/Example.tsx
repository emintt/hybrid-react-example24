import { useState, useEffect, useRef } from 'react';

function Example() {
  const [count, setCount] = useState<number>(0);
  const testElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
      // Update div element's color based on count
      testElement.current?.style.setProperty('background-color', `rgb(${count * 5}, 0, 0)`);
      // return () => {console.log('component close');}
    }, [count]); // Only re-run the effect if count changes

  return (
      <div ref={testElement}>
          <p>You clicked {count} times</p>
          <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
  );
}

export default Example;

// import {useState} from 'react';

// function Example() {
//     const [name, setName] = useState<string | null>(null);

//     return (
//         <div>
//             <p>You entered: {name}</p>
//             <input
//                 type="text"
//                 value={name ? name : ''} // Check for null/undefined
//                 onChange={(e) => setName(e.target.value)}
//             />
//         </div>
//     );
// }

// export default Example;

