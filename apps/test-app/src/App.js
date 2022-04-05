import { Button } from '@matera/test-common';
import { COLORS, buildTranslationKeys } from '@matera-tech/utils';

function App() {
  const key = "toto";
  const result = buildTranslationKeys(key, ["suffix"])

  console.log(result)
  return (
    <div className="App">
      <div>Button from @matera/test-common</div>
      <Button/>
      <div>Color :</div>
      {COLORS.success.normal}
    </div>
  );
}

export default App;
