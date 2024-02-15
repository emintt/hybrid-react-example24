import { useExampleStore } from '../example-store';


// counteri component, jossa kutsu useExampleStore
// count: state, mitä halua jakaa, + ja - nappula
export default function Example() {
  const { count, increment, decrement } = useExampleStore();

  return (
    <>
      Count: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}



// import { useState, useEffect, useRef } from 'react';

// function Example() {
//   const [count, setCount] = useState<number>(0);
//   const testElement = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//       // Update div element's color based on count
//       testElement.current?.style.setProperty('background-color', `rgb(${count * 5}, 0, 0)`);
//       // return () => {console.log('component close');}
//     }, [count]); // Only re-run the effect if count changes

//   return (
//       <div ref={testElement}>
//           <p>You clicked {count} times</p>
//           <button onClick={() => setCount(count + 1)}>Click me</button>
//       </div>
//   );
// }

// export default Example;
