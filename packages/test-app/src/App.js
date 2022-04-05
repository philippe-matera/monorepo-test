import { Button } from '@matera/test-common';
import {COLORS} from '@matera-tech/utils';

function App() {
  console.log(COLORS);

  return (
    <div className="App">
      Button from @matera/test-common package :
      <Button/>
    </div>
  );
}

export default App;
