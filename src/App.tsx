import './App.css';
import * as Setup from './setup/setup'
import { Core } from './core/core';
import ReactMatrixTable from '@paraboly/react-matrix-table';

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

  const rows = core.g.map((_, index) => index.toString())

  const data = []

  for (let k = 0; k < Setup.K; k++) {
    data.push([
      k + 1,
      core.M[k].index + 1,
      ...core.g[k],
      core.M[k].value,
      ...core.h[k],
      core.V[k].index + 1,
      core.V[k].value
    ])
  }

  return (
    <div className="App">
        <ReactMatrixTable
          rows={rows}
          columns={columns}
          data={data}
        />
    </div>
  );
}

export default App;
