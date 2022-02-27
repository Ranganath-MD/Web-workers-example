onmessage = (e) => {
  console.log(e, "in workers")
  for (let i = 0; i < e.data; i++) {
    setTimeout(() => {
      postMessage(i);
    }, 1000);
  }
}