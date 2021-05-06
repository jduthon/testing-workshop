import { render } from '@testing-library/react';
import Converter from './converter';


const { getByLabelText } = render(<Converter />);
const myInput = getByLabelText('Meters to convert:');
describe('Converter',() => {
  it ('has the input field', () => {
    expect(myInput).toBeDefined();
  })
  it('calculates the correct result', () => {
    
  })
})