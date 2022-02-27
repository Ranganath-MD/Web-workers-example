/**
 * Javascript is single threaded. so we can not run the code in parallel.
 * web workers are used to run the code in parallel.
 * web workers is a javascript code that runs in the background and does not block the browser.
 */
import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const [count_ww, setCountWW] = useState(0);

  const withoutWebWorkers = () => {
    for (let i = 0; i < 100000; i++) {
      setTimeout(() => {
        setCount(i);
      }, 1000);
    }
  };

  const withWebWorkers = () => {
    const worker = new Worker(
      new URL("../worker.js", import.meta.url)
    );
    worker.postMessage(100000);
    worker.onmessage = (e) => {
      console.log(e.data, "data from workers");
      setCountWW(e.data);
    };
  };

  return (
    <div>
      <section>
        <h1>Without webworkers</h1>
        <p>
          on click of the button, the entire page is going
          to be unresponsive because it is doing heavy
          operation
        </p>
        <h1>{count}</h1>
        <button onClick={withoutWebWorkers}>
          Start heavy duty
        </button>
        <br />
        <input
          type="text"
          placeholder="type something........"
        />
      </section>
      <section>
        <h1>With webworkers</h1>
        <p>
          on click of the button, the page will be
          responsive because the heavy operation runs in the
          background and does not block the browser.
        </p>
        <h1>{count_ww}</h1>
        <button onClick={withWebWorkers}>
          Start heavy duty
        </button>
        <br />
        <input
          type="text"
          placeholder="type something........"
        />
      </section>

      <style jsx>{`
        section {
          border: 2px dotted black;
          margin: 20px;
          padding: 20px;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}
