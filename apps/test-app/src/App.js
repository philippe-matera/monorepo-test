import { Button } from '@matera/test-common';
import { COLORS, buildTranslationKeys } from '@matera-tech/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const key = "toto";
  const result = buildTranslationKeys(key, ["suffix"])
  const notify = () => toast("Wow so easy!");


  console.log(result)
  return (
    <div className="App">
        <div>Button from @matera/test-common</div>
        <Button/>
        <div>Color :</div>
        {COLORS.success.normal}
        <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
