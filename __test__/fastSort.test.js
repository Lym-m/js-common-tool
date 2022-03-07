import {fastSort} from "../src/FastSort";


test('fastSort', () => {
    expect(fastSort([5,8,4,2,9,7,5,1,9])).toStrictEqual([1,2,4,5,5,7,8,9,9]);
})

