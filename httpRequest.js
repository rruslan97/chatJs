export async function postData(url, data, method, token) {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });
      if (response.status !== 200) {
        throw new Error('Ошибка запроса на сервер');
      }
      return await response.json()
    } catch (error) {
      alert(error)
    }
  };


export async function getData(url, token) {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          Authorization: `Bearer ${token}`
        },
      });
      if (response.status !== 200) {
        throw new Error('Ошибка запроса на сервер');
      }
      return await response.json()
    } catch (error) {
      alert(error)
    }
  };

export async function getMyEmail() {
    const response = await getData('https://edu.strada.one/api/user/me', localStorage.getItem('token'));
    const account = await response;
    return account.email;
  };