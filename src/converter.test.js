import { render } from '@testing-library/react';
import Converter from './converter';


const { getByText } = render(<Converter />);
const text = getByText('1 m = 100 cm');
describe('Converter',() => {
  it ('has initial text', () => {
    expect(text).toBeDefined();
  })
})