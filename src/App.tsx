import './App.css';
import * as Setup from './setup/setup'
import { Core } from './core/core';

function App() {
  const core = new Core(Setup.A, Setup.I, Setup.J, Setup.K);

  core.run();

  const columns = [
    'k', 
    'Jk', 
    ...core.g[0].map((_, index) => `g${index}`),
    'Mk',
    ...core.h[0].map((_, index) => `h${index}`),
    'Ik',
    'Vk'
  ]

  const data = []

  for (let k = 0; k < Setup.K; k++) {
    const record: {[key: string]: any} = {
      k: k + 1,
      Jk: core.M[k].index + 1,
      Mk: core.M[k].value,
      Ik: core.V[k].index + 1,
      Vk: core.V[k].value
    }

    for (let j = 0; j < core.g[k].length; j++) {
      record[`g${j}`] = core.g[k][j]
      record[`h${j}`] = core.h[k][j]
    }

    data.push(record)
  }

  console.table(data, columns)

  return (
    <div className="App">
    </div>
  );
}

export default App;
