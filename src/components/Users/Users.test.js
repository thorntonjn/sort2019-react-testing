// users.test.js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

describe('Users', () => {
  it('should fetch users', () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    axios.get.mockResolvedValue(resp);
    return Users.all().then(data => expect(data).toEqual(users));
  })

  it('should fetch users with get mockedImplementation', () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    axios.get.mockImplementation(() => Promise.resolve(resp))
    return Users.all().then(data => expect(data).toEqual(users));
  })

})
