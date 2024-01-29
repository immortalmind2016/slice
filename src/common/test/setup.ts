export const signin = async (request) => {
  const user = {
    email: 'test4@gmail.com',
    password: '1234567891',
    fullname: '1234',
  };

  const response = await request.post('/users/register').send(user).expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
